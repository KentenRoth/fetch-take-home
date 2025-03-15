import { useEffect, useState } from "react";
import { useData } from "../context/dataContext";
import { useBreeds } from "../hooks/useBreeds";
import Select from "react-select";

interface IProps {
  show: () => void;
}

export const BreedModal = (props: IProps) => {
  const { show } = props;
  const { breeds, loading: breedsLoading, error: breedsError } = useBreeds();
  const [mySelectedBreeds, setMySelectedBreeds] = useState<string[]>([]);
  const { selectedBreeds, setSelectedBreeds } = useData();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedBreeds(mySelectedBreeds);
    show();
  };

  useEffect(() => {
    if (selectedBreeds.length > 0) {
      setMySelectedBreeds(selectedBreeds);
    }
  }, []);

  return (
    <>
      <div className="breed-modal">
        <div className="breed-modal_wrapper">
          <div className="breed-modal_header">
            <h2>Lets Get Started</h2>
            <button className="close" onClick={show}>
              X
            </button>
          </div>
          <p>Please select a list of your favorite dog breeds below!</p>
          <form onSubmit={onSubmit}>
            <Select
              className="react-select-container"
              classNamePrefix={"react-select"}
              isMulti
              isSearchable
              options={breeds.map((breed) => ({ value: breed, label: breed }))}
              onChange={(selectedBreed) => {
                setMySelectedBreeds(selectedBreed.map((breed) => breed.value));
              }}
              value={mySelectedBreeds.map((breed: any) => ({
                value: breed,
                label: breed,
              }))}
              placeholder="Select Breed"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
