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
  const {
    puppiesInfo,
    loading: puppiesInfoLoading,
    error: puppiesInfoError,
  } = usePuppiesInfo(props.pups);

  const favoritesList = (puppy: string) => {
    if (favorites.includes(puppy)) {
      setFavorites(favorites.filter((fav) => fav !== puppy));
    } else {
      setFavorites([...favorites, puppy]);
    }
  };

  return (
    <>
      <PaginationBar prev={props.prev} next={props.next} />
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
      <PaginationBar prev={props.prev} next={props.next} />
    </>
  );
};
