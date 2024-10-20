// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
