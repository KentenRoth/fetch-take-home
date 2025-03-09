import { useState, useEffect } from "react";
import axios from "../axios/axios";

export const PaginationBar = () => {
  return (
    <>
      <div className="pagination-bar">
        <div className="pagination-bar_wrapper">
          <div className="pagination-bar_filter">
            <button>Filter</button>
          </div>
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
    </>
  );
};
