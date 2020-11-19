import React from "react";
import "./Pagination.css";

function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div className="pagination">
      <div className="btn" onClick={gotoPrevPage}>
        <img src="arrow-alt-circle-left-regular.svg" alt="" className="mr" />
        Previous
      </div>
      <div className="btn" onClick={gotoNextPage}>
        Next
        <img src="arrow-alt-circle-right-regular.svg" alt="" className="ml" />
      </div>
    </div>
  );
}

export default Pagination;
