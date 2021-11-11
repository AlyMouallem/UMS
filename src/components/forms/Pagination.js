import React from "react";
import _ from "lodash";
const Pagination = ({ itemsCount, pageSize, currentPage, pageChange }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) {
    return null;
  }

  const pages = _.range(1, pageCount + 1);

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              key={index}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => pageChange(page)}>
                {" "}
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
