import React from "react";
import "./Search.css";

function Search({ search, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="search">
      <img src="search-solid.svg" alt="" />
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
}
export default Search;
