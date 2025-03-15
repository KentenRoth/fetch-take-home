import { useEffect, useState } from "react";
import { useGetPuppy } from "../../hooks/useGetPuppy";
import { PaginationBar } from "../PaginationBar";
import { PuppiesCard } from "./PuppiesCard";
import { Filters } from "../../types";
import { useData } from "../../context/dataContext";

interface IProps {
  filters: (filters: Filters) => void;
  currentFilters: Filters;
}

export const Puppies = (props: IProps) => {
  const filters = props.filters;
  const { loading, error, puppiesInfo } = useData();

  const { favorites, setFavorites } = useData();

  const { minAge, maxAge, sort } = props.currentFilters;

  const {
    puppiesInfo: perfectPuppy,
    loading: perfectPuppyLoading,
    error: perfectPuppyError,
    fetchPuppy,
  } = useGetPuppy();

  const favoritesList = (puppy: string) => {
    if (favorites.includes(puppy)) {
      setFavorites(favorites.filter((fav) => fav !== puppy));
    } else {
      setFavorites([...favorites, puppy]);
    }
  };

  const handleGetPuppy = () => {
    fetchPuppy(favorites);
  };

  useEffect(() => {
    if (perfectPuppyLoading) {
      console.log("Finding your perfect puppy!");
    }
    if (perfectPuppyError) {
      console.log(perfectPuppyError);
    }
    if (perfectPuppy) {
      console.log("Perfect Puppy Data:", perfectPuppy);
    }
  }, [perfectPuppyLoading, perfectPuppyError, perfectPuppy]);

  return (
    <>
      <PaginationBar
        filters={filters}
        currentFilters={{ minAge, maxAge, sort }}
        getPuppy={handleGetPuppy}
      />
      <div className="wrapper">
        {loading && <h2>Finding You're Puppies!</h2>}
        {error && <h2>{error}</h2>}
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
        filters={filters}
        currentFilters={{ minAge, maxAge, sort }}
        getPuppy={handleGetPuppy}
      />
    </>
  );
};
