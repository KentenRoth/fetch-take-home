import { useState, useEffect } from "react";
import { BreedModal } from "../Modal/breedModal";
import { Puppies } from "../Components/Puppies/Puppies";
import { useBreeds } from "../hooks/useBreeds";
import { BreedsList } from "../Components/BreedsList";
import { useData } from "../context/dataContext";

export const Main = () => {
  const { breeds, loading: breedsLoading, error: breedsError } = useBreeds();
  const [showModal, setShowModal] = useState(true);
  const [minAge, setMinAge] = useState<number | undefined>();
  const [maxAge, setMaxAge] = useState<number | undefined>();
  const [sort, setSort] = useState<string>("breed:asc");

  const { selectedBreeds, setSelectedBreeds, puppies, prevPage, nextPage } =
    useData();

  const handleApplyFilters = (filters: {
    minAge: number | undefined;
    maxAge: number | undefined;
    sort: string;
  }) => {
    setMinAge(filters.minAge);
    setMaxAge(filters.maxAge);
    setSort(filters.sort);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleSelectBreeds = (breed: string[]) => {
    setSelectedBreeds(breed);
  };

  const removeBreed = (breed: string) => {
    setSelectedBreeds(selectedBreeds.filter((b) => b !== breed));
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showModal]);

  return (
    <>
      <div className="main">
        <div className="main_wrapper">
          <div className="main_heading">
            <div className="main_heading__header">
              <h1>Find Your Perfect Puppy</h1>
              <button onClick={handleShowModal}>Search Breeds</button>
            </div>
            <div className="main_heading__breeds">
              <BreedsList breeds={selectedBreeds} removeBreed={removeBreed} />
            </div>
          </div>
        </div>
        <div className="main_heading"></div>
        {showModal && (
          <BreedModal
            show={handleShowModal}
            breed={breeds}
            onSelectBreeds={handleSelectBreeds}
            selectedBreeds={selectedBreeds}
          />
        )}
        {selectedBreeds.length > 0 ? (
          <Puppies
            filters={handleApplyFilters}
            currentFilters={{ minAge, maxAge, sort }}
          />
        ) : (
          <div className="wrapper">
            <h2>Please select your favorite breeds</h2>
          </div>
        )}
      </div>
    </>
  );
};
