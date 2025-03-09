import { useState, useEffect } from "react";

interface IProps {
  show: () => void;
  filters: (filters: {
    showFavorites: boolean;
    minAge: number;
    maxAge: number;
    breedOrder: string;
    ageOrder: string;
  }) => void;
  currentFilters: {
    showFavorites: boolean;
    minAge: number;
    maxAge: number;
    breedOrder: string;
    ageOrder: string;
  };
}

export const FiltersModal = (props: IProps) => {
  const { show, filters, currentFilters } = props;
  const [showFavorites, setShowFavorites] = useState<boolean>(
    currentFilters.showFavorites
  );
  const [minAge, setMinAge] = useState<number>(currentFilters.minAge);
  const [maxAge, setMaxAge] = useState<number>(currentFilters.maxAge);
  const [breedOrder, setBreedOrder] = useState<string>(
    currentFilters.breedOrder
  );
  const [ageOrder, setAgeOrder] = useState<string>(currentFilters.ageOrder);

  useEffect(() => {
    setShowFavorites(props.currentFilters.showFavorites);
  }, [props.currentFilters.showFavorites]);

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    filters({ showFavorites, minAge, maxAge, breedOrder, ageOrder });
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
            <div className="breed-filter">
              <label>
                Breed Order
                <input type="radio" name="breedOrder" value="asc" />
                Asc
                <input type="radio" name="breedOrder" value="desc" />
                Desc
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
              <label>
                Breed Order
                <input type="radio" name="ageOrder" value="asc" />
                Asc
                <input type="radio" name="ageOrder" value="desc" />
                Desc
              </label>
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
