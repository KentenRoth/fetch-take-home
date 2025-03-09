import { useState, useEffect } from "react";
import { BreedModal } from "../Modal/breedModal";
import { Puppies } from "../Components/Puppies/Puppies";
import { useBreeds } from "../hooks/useBreeds";
import { usePuppies } from "../hooks/usePuppies";

export const Main = () => {
  const { breeds, loading: breedsLoading, error: breedsError } = useBreeds();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(true);
  const {
    puppies,
    loading: puppiesLoading,
    error: puppiesError,
  } = usePuppies(selectedBreeds);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleSelectBreeds = (breed: string[]) => {
    setSelectedBreeds(breed);
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
        <h2>Selected Breeds</h2>
        <ul>
          {selectedBreeds.map((breed, index) => (
            <li key={index}>{breed}</li>
          ))}
        </ul>
        <div>
          <button onClick={handleShowModal}>Show</button>
        </div>
        {showModal && (
          <BreedModal
            show={handleShowModal}
            breed={breeds}
            onSelectBreeds={handleSelectBreeds}
            selectedBreeds={selectedBreeds}
          />
        )}
        {selectedBreeds.length > 0 ? (
          <Puppies pups={puppies} />
        ) : (
          <h2>Please select your favorite breeds</h2>
        )}
      </div>
    </>
  );
};
