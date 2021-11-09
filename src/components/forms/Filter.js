import React from "react";

const Filter = ({ items }) => {
  return (
    <>
      <ul className="list-group">
        <>
          <li className="list-group-item btn btn-sm  btn-primary">All</li>
          {items.map((item, index) => (
            <li key={index} className="list-group-item btn btn-sm btn-primary">
              {item}
            </li>
          ))}
        </>
      </ul>
    </>
  );
};

export default Filter;
