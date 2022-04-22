import React from 'react'
import { useEffect, useState } from "react";

function Pagination(props) {
    const { total, currentPage, click } = props;
    const [page, setPage] = useState([]);
  
    useEffect(() => {
      let list = [];
      let firstItem;
      let lastItem;
      let addLast = ["...", total];
      let addFirst = [1, "..."];
  
      if (total > 7) {
        if (currentPage > total - 4) {
          lastItem = total;
          firstItem = currentPage - 2;
        } else if (currentPage < 5) {
          lastItem = currentPage + 2;
          firstItem = 1;
        } else if (currentPage > 4) {
          lastItem = currentPage + 2;
          firstItem = currentPage - 2;
        }
  
        while (firstItem <= lastItem) {
          list.push(firstItem);
          firstItem++;
        }
  
        if (currentPage < total - 3) {
          list = [...list, ...addLast];
        }
  
        if (currentPage > 4) {
          list = [...addFirst, ...list];
        }
      } else {
        for (let i = 1; i <= total; i++) {
          list.push(i);
        }
      }
  
      setPage([...list]);
    }, [total, currentPage]);
  return (
    <div className="pagination">
    {currentPage > 1 && (
      <span onClick={() => click({ type: "prev" })} className="previous-page">{"<"}</span>
    )}
    <div className="pages">
        {page.map((item, index) => (
        <div className="page-number" key={index}>
            <div
            onClick={() => click({ type: "add", number: item })}
            className={currentPage === item ? "active-page" : ""}
        >
            {item}
        </div>
        </div>
        ))}
    </div>
    {currentPage < total && (
      <span onClick={() => click({ type: "next" })} className="next-page">{">"}</span>
    )}
  </div>
  )
}

export default Pagination