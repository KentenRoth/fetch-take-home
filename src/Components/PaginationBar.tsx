import { useState, useEffect } from "react";
import axios from "../axios/axios";

interface IProps {
  next: () => void;
  prev: () => void;
}

export const PaginationBar = (props: IProps) => {
  return (
    <>
      <div className="pagination-bar">
        <div className="pagination-bar_wrapper">
          <div className="pagination-bar_filter">
            <button>Filter</button>
          </div>
          <button onClick={props.prev}>Prev</button>
          <button onClick={props.next}>Next</button>
        </div>
      </div>
    </>
  );
};
