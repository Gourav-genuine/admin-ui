import React, { useState } from "react";
import "./PaginationBar.css";

const PaginationBar = (props) => {
  const pagination = [];
  let pageNumStyle = {
    backgroundColor: "rgb(138, 201, 138)",
    padding: "1vw",
    borderRadius: ".2vw",
  }

  const showPagination = () => {
    if (props.totalPages > 1) {
      for (let i = 1; i <= props.totalPages; i++) {
        pagination.push(
          <span
            key={i}
            id="p4"
            style={i === props.pageNum ? pageNumStyle : null}
            onClick={() => {
              props.setPageNum(i);
              
            }}
          >
            {i}
          </span>
        );
      }
    }
  };

  showPagination();

  return (
    <div id="p1">
      <div className="pagination-bar">
        <div id="delButton">
          <div
            id="delButton"
            onClick={() => {
              props.deleteSelectedData();
              props.setAllChecked(false);
            }}
          >
            Delete Selected
          </div>
        </div>

        <div id="p2">
          <button onClick={() => props.setPageNum(1)}>
            <span class="material-icons">first_page</span>
          </button>
          <button onClick={() => props.prevPage()}>
            <span class="material-icons">navigate_before</span>
          </button>

          <div id="p3">
            {pagination.map((ele) => (
              <div>{ele}</div>
            ))}
          </div>

          <button className="navigate_next" onClick={() => props.nextPage()}>
            <span class="material-icons">navigate_next</span>
          </button>
          <button onClick={() => props.setPageNum(props.totalPages)}>
            <span class="material-icons">last_page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationBar;
