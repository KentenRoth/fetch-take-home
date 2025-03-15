import { useState, useEffect } from "react";
import { BreedModal } from "../Modal/breedModal";
import { Puppies } from "../Components/Puppies/Puppies";
import { BreedsList } from "../Components/BreedsList";
import { useData } from "../context/dataContext";

export const Main = () => {
  const [showModal, setShowModal] = useState(true);

  const { selectedBreeds } = useData();

  const handleShowModal = () => {
    setShowModal(!showModal);
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
              <BreedsList />
            </div>
          </div>
        </div>
        <div className="main_heading"></div>
        {showModal && <BreedModal show={handleShowModal} />}
        {selectedBreeds.length > 0 ? (
          <Puppies />
        ) : (
          <div className="wrapper">
            <h2>Please select your favorite breeds</h2>
          </div>
        )}
      </div>
    </>
  );
};
