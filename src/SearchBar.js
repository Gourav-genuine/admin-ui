import React from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  return (
    <div id="main">
      <input
        id="inputBar"
        type="text"
        placeholder="      Search by name, email or role ..."
        onChange={(e) => props.setSearchData(e.target.value)}
      />
      
    </div>
  );
};

export default SearchBar;
