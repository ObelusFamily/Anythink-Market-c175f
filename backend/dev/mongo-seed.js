require('dotenv').config();
const mongoose = require('mongoose');

require('../models/User');
require('../models/Item');
require('../models/Comment');

if (!process.env.MONGODB_URI) {
  console.warn('Missing MONGODB_URI in env, please add it to your .env file');
}
  
mongoose.connect(process.env.MONGODB_URI);

(async () => {
    // Create users
    const User = mongoose.model('User');
    const userIdx = [...Array(100).keys()];
    const userIds = await Promise.all(userIdx.map((index) => {
        const user = new User();
        user.username = `user${index}`;
        user.email = `${user.username}@test.com`;
        user.setPassword(user.username);
    
        return user
            .save()
            .then(res => res._id);
    }));
    console.log('userIds', userIds);

    // Create posts and comments
    const Item = mongoose.model('Item');
    const Comment = mongoose.model('Comment');
    const itemIdx = [...Array(100).keys()];
    const itemIds = await Promise.all(itemIdx.map(async (index) => {
        const item = new Item();
        item.title = `Item ${index}`;
        item.description = `Item ${index} description`;
        item.image = 'https://google.com/logo.png';
        item.tagList = [];
        item.seller = userIds[index];

        const comment = new Comment();
        comment.body = `Comment ${index}`;
        comment.item = item;
        comment.seller = userIds[index];

        item.comments = [comment];

        await comment.save();
        return item
            .save()
            .then(res => res._id);
    }));
    console.log('itemIds', itemIds);
})();
