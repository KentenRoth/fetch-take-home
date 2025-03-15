import { useState, useEffect } from "react";
import { FiltersModal } from "../Modal/filtersModal";
import { useData } from "../context/dataContext";

interface IProps {
  getPuppy: () => void;
}

export const PaginationBar = (props: IProps) => {
  const { getPuppy } = props;
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { favorites, nextPage, prevPage, next, prev } = useData();

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
            {favorites.length > 0 && (
              <button className="perfect-puppy" onClick={getPuppy}>
                Your Perfect Puppy
              </button>
            )}
            <button onClick={handleFilters}>Filters</button>
            {showFilters && <FiltersModal show={handleFilters} />}
          </div>
          <button onClick={prevPage} disabled={!prev}>
            Prev
          </button>
          <button onClick={nextPage} disabled={!next}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};
