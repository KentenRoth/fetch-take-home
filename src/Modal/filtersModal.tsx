import { useState, useEffect } from "react";
import { useData } from "../context/dataContext";

interface IProps {
  show: () => void;
}

export const FiltersModal = (props: IProps) => {
  const { show } = props;
  const { showFavorites, setShowFavorites, filters, setFilters } = useData();
  const [ageMin, setAgeMin] = useState<number | undefined>(filters?.ageMin);
  const [ageMax, setAgeMax] = useState<number | undefined>(filters?.ageMax);

  const [sortCategory, setSortCategory] = useState<string>(
    filters.sort.split(":")[0] || "breed"
  );
  const [sortOrder, setSortOrder] = useState<string>(
    filters.sort.split(":")[1] || "asc"
  );

  useEffect(() => {
    const [category, order] = filters.sort.split(":");
    setSortCategory(category || "breed");
    setSortOrder(order || "asc");
  }, [filters.sort]);

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const sort = `${sortCategory}:${sortOrder}`;
    setFilters({ ageMin, ageMax, sort });
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
                  value={ageMin}
                  onChange={(e) => setAgeMin(Number(e.target.value))}
                />
              </label>
              <label>
                Max Age
                <input
                  type="number"
                  name="maxAge"
                  value={ageMax}
                  onChange={(e) => setAgeMax(Number(e.target.value))}
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
