import { useState } from "react";
import { usePuppiesInfo } from "../../hooks/usePuppiesInfo";
import { PaginationBar } from "../PaginationBar";
import { PuppiesCard } from "./PuppiesCard";

interface IProps {
  pups: string[];
  prev: () => void;
  next: () => void;
  filters: (filters: { minAge: number; maxAge: number; sort: string }) => void;
  currentFilters: {
    minAge: number;
    maxAge: number;
    sort: string;
  };
}

export const Puppies = (props: IProps) => {
  const filters = props.filters;
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const { minAge, maxAge, sort } = props.currentFilters;
  const puppyIds = showFavorites ? favorites : props.pups;

  const {
    puppiesInfo,
    loading: puppiesInfoLoading,
    error: puppiesInfoError,
  } = usePuppiesInfo(puppyIds);

  const favoritesList = (puppy: string) => {
    if (favorites.includes(puppy)) {
      setFavorites(favorites.filter((fav) => fav !== puppy));
    } else {
      setFavorites([...favorites, puppy]);
    }
  };

  const handleFavorite = (filters: { showFavorites: boolean }) => {
    setShowFavorites(filters.showFavorites);
  };

  return (
    <>
      <PaginationBar
        prev={props.prev}
        next={props.next}
        filters={filters}
        favorite={handleFavorite}
        currentFilters={{ showFavorites, minAge, maxAge, sort }}
      />
      {puppiesInfoLoading && <h2>Finding You're Puppies!</h2>}
      {puppiesInfoError && <h2>{puppiesInfoError}</h2>}
      <div className="wrapper">
        <div className="puppies-grid">
          {puppiesInfo.map((puppy, index) => (
            <PuppiesCard
              key={index}
              puppy={puppy}
              toggleFavorites={favoritesList}
              isFavorite={favorites.includes(puppy.id)}
            />
          ))}
        </div>
      </div>
      <PaginationBar
        prev={props.prev}
        next={props.next}
        filters={filters}
        favorite={handleFavorite}
        currentFilters={{ showFavorites, minAge, maxAge, sort }}
      />
    </>
  );
};
