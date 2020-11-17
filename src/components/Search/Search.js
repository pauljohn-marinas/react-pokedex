import React from "react";

function Search({ search, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="search">
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
}
export default Search;
