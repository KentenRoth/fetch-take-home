import { useState, useEffect } from "react";
import { FiltersModal } from "../Modal/filtersModal";
import { Filters } from "../types";

interface IProps {
  filters: (filters: Filters) => void;
  currentFilters: Filters;
  favorite: (filters: { showFavorites: boolean }) => void;
  hasFavorites: boolean;
  getPuppy: () => void;
}

export const PaginationBar = (props: IProps) => {
  const { filters, currentFilters, favorite, hasFavorites, getPuppy } = props;
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    if (showFilters) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showFilters]);

  return (
    <>
      <div className="pagination-bar">
        <div className="pagination-bar_wrapper">
          <div className="pagination-bar_filter">
            {hasFavorites && (
              <button className="perfect-puppy" onClick={getPuppy}>
                Your Perfect Puppy
              </button>
            )}
            <button onClick={handleFilters}>Filters</button>
            {showFilters && (
              <FiltersModal
                show={handleFilters}
                filters={filters}
                currentFilters={currentFilters}
                favorite={favorite}
              />
            )}
          </div>
          {/* <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button> */}
        </div>
      </div>
    </>
  );
};
