import { useState, useEffect } from "react";
import { BreedModal } from "../Modal/breedModal";
import { Puppies } from "../Components/Puppies/Puppies";
import { useBreeds } from "../hooks/useBreeds";
import { usePuppies } from "../hooks/usePuppies";
import { BreedsList } from "../Components/BreedsList";

export const Main = () => {
  const { breeds, loading: breedsLoading, error: breedsError } = useBreeds();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [minAge, setMinAge] = useState<number>();
  const [maxAge, setMaxAge] = useState<number>();
  const [sort, setSort] = useState<string>("");

  const handleApplyFilters = (filters: {
    minAge: number;
    maxAge: number;
    sort: string;
  }) => {
    setMinAge(filters.minAge);
    setMaxAge(filters.maxAge);
    setSort(filters.sort);
  };

  const filters = {
    ageMin: minAge,
    ageMax: maxAge,
    sort: sort,
  };

  const {
    puppies,
    nextPage,
    prevPage,
    loading: puppiesLoading,
    error: puppiesError,
  } = usePuppies(selectedBreeds, filters);

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
            pups={puppies}
            prev={prevPage}
            next={nextPage}
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
