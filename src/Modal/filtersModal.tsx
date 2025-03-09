import { useState, useEffect } from "react";

interface IProps {
  show: () => void;
  filters: (filters: { showFavorites: boolean }) => void;
  currentFilters: { showFavorites: boolean };
}

export const FiltersModal = (props: IProps) => {
  const { show, filters } = props;
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    setShowFavorites(props.currentFilters.showFavorites);
  }, [props.currentFilters.showFavorites]);

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleApplyFilters = () => {
    filters({ showFavorites });
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
          <label>
            <input
              type="checkbox"
              checked={showFavorites}
              onChange={handleShowFavorites}
            />
            Show Favorites
          </label>
          <button onClick={handleApplyFilters}>Apply</button>
        </div>
      </div>
      <div></div>
    </>
  );
};
