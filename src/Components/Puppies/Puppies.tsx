import { useState } from "react";
import { usePuppiesInfo } from "../../hooks/usePuppiesInfo";
import { PaginationBar } from "../PaginationBar";
import { PuppiesCard } from "./PuppiesCard";

interface IProps {
  pups: string[];
  prev: () => void;
  next: () => void;
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
    console.log(favorites);
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
      <div className="wrapper">
        {puppiesInfoLoading && <h2>Finding You're Puppies!</h2>}
        {puppiesInfoError && <h2>{puppiesInfoError}</h2>}
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
