import { useState, useEffect } from "react";
import { FiltersModal } from "../Modal/filtersModal";

interface IProps {
  next: () => void;
  prev: () => void;
  filters: (filters: {
    showFavorites: boolean;
    minAge: number | undefined;
    maxAge: number | undefined;
    sort: string;
  }) => void;
  currentFilters: {
    showFavorites: boolean;
    minAge: number | undefined;
    maxAge: number | undefined;
    sort: string;
  };
  favorite: (filters: { showFavorites: boolean }) => void;
}

export const PaginationBar = (props: IProps) => {
  const { next, prev, filters, currentFilters, favorite } = props;
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
            <button onClick={handleFilters}>Filter</button>
            {showFilters && (
              <FiltersModal
                show={handleFilters}
                filters={filters}
                currentFilters={currentFilters}
                favorite={favorite}
              />
            )}
          </div>
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>
        </div>
      </div>
    </>
  );
};
