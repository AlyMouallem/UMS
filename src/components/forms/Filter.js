import React from "react";

const Filter = ({ items, handleClick }) => {
  return (
    <>
      <ul className="list-group">
        <>
          <li
            onClick={() => handleClick("All")}
            value="All"
            className="list-group-item btn btn-sm btn-primary"
          >
            All
          </li>
          {items.map((item, index) => (
            <li
              key={index}
              value={item}
              onClick={() => handleClick(item)}
              className="list-group-item btn btn-sm btn-primary"
            >
              {item}
            </li>
          ))}
        </>
      </ul>
    </>
  );
};

export default Filter;
