import React from "react";
import logo from "../../imgs/logo.png";

const Banner = ({ onSearch }) => {
  const onInputChange = (value) => {
    if (value.length <= 3) {
      onSearch(undefined);
    } else {
      onSearch(value);
    }
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part">A place to get</span>
          <input
            id="search-box"
            placeholder="Type here to search..."
            onChange={(e) => onInputChange(e.target.value)}
          />
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
