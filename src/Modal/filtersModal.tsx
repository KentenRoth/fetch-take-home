import { useState, useEffect } from "react";

interface IProps {
  show: () => void;
  filters: (filters: {
    minAge: number | undefined;
    maxAge: number | undefined;
    sort: string;
  }) => void;
  currentFilters: {
    minAge: number | undefined;
    maxAge: number | undefined;
    sort: string;
  };
  favorite: (filters: { showFavorites: boolean }) => void;
}

export const FiltersModal = (props: IProps) => {
  const { show, filters, currentFilters, favorite } = props;
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [minAge, setMinAge] = useState<number | undefined>(
    currentFilters?.minAge
  );
  const [maxAge, setMaxAge] = useState<number | undefined>(
    currentFilters?.maxAge
  );

  const [sortCategory, setSortCategory] = useState<string>(
    currentFilters.sort.split(":")[0] || "breed"
  );
  const [sortOrder, setSortOrder] = useState<string>(
    currentFilters.sort.split(":")[1] || "asc"
  );

  useEffect(() => {
    const [category, order] = props.currentFilters.sort.split(":");
    setSortCategory(category || "breed");
    setSortOrder(order || "asc");
  }, [props.currentFilters]);

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const sort = `${sortCategory}:${sortOrder}`;
    filters({ minAge, maxAge, sort });
    favorite({ showFavorites });
    show();
  };

  return (
    <>
      <div className="filters-modal">
        <div className="filters-modal_wrapper">
          <div className="filters-modal_header">
            <h2>Filters</h2>
            <button className="close" onClick={show}>
              X
            </button>
          </div>
          <form onSubmit={handleApplyFilters}>
            <div className="favorites-filter">
              <label>
                <input
                  type="checkbox"
                  checked={showFavorites}
                  onChange={handleShowFavorites}
                />
                Show Favorites
              </label>
            </div>

            <div className="age-filter">
              <label>
                Min Age
                <input
                  type="number"
                  name="minAge"
                  value={minAge}
                  onChange={(e) => setMinAge(Number(e.target.value))}
                />
              </label>
              <label>
                Max Age
                <input
                  type="number"
                  name="maxAge"
                  value={maxAge}
                  onChange={(e) => setMaxAge(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="sort-filter">
              <div className="sort-category">
                <label>Sort By</label>
                <div className="sort-category_options">
                  <input
                    type="radio"
                    name="sortCategory"
                    value="breed"
                    checked={sortCategory === "breed"}
                    onChange={() => setSortCategory("breed")}
                  />
                  Breed
                </div>
                <div className="sort-category_options">
                  <input
                    type="radio"
                    name="sortCategory"
                    value="age"
                    checked={sortCategory === "age"}
                    onChange={() => setSortCategory("age")}
                  />
                  Age
                </div>
                <div className="sort-category_options">
                  <input
                    type="radio"
                    name="sortCategory"
                    value="name"
                    checked={sortCategory === "name"}
                    onChange={() => setSortCategory("name")}
                  />
                  Name
                </div>
              </div>

              <div className="sort-order">
                <label>Sort Order</label>
                <div className="sort-category_options">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="asc"
                    checked={sortOrder === "asc"}
                    onChange={() => setSortOrder("asc")}
                  />
                  Ascending
                </div>
                <div className="sort-category_options">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="desc"
                    checked={sortOrder === "desc"}
                    onChange={() => setSortOrder("desc")}
                  />
                  Descending
                </div>
              </div>
            </div>
            <button className="filters-submit" type="submit">
              Apply Filters
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
