import { useState } from "react";
import { usePuppiesInfo } from "../../hooks/usePuppiesInfo";
import { PaginationBar } from "../PaginationBar";
import { PuppiesCard } from "./PuppiesCard";

interface IProps {
  pups: string[];
  prev: () => void;
  next: () => void;
}

export const Puppies = (props: IProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(100);
  const [breedOrder, setBreedOrder] = useState<string>("asc");
  const [ageOrder, setAgeOrder] = useState<string>("asc");

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

  const handleApplyFilters = (filters: {
    showFavorites: boolean;
    minAge: number;
    maxAge: number;
    breedOrder: string;
    ageOrder: string;
  }) => {
    setShowFavorites(filters.showFavorites);
    setMinAge(filters.minAge);
    setMaxAge(filters.maxAge);
    setBreedOrder(filters.breedOrder);
    setAgeOrder(filters.ageOrder);
  };

  return (
    <>
      <PaginationBar
        prev={props.prev}
        next={props.next}
        filters={handleApplyFilters}
        currentFilters={{ showFavorites, minAge, maxAge, breedOrder, ageOrder }}
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
        filters={handleApplyFilters}
        currentFilters={{ showFavorites, minAge, maxAge, breedOrder, ageOrder }}
      />
    </>
  );
};
