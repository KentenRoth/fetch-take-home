import { useData } from "../context/dataContext";

export const BreedsList = () => {
  const { selectedBreeds, setSelectedBreeds } = useData();

  const removeBreed = (breed: string) => {
    setSelectedBreeds(selectedBreeds.filter((b) => b !== breed));
  };

  return (
    <div className="breeds-list">
      {selectedBreeds.length === 0 ? (
        ""
      ) : (
        <>
          <h3 className="breeds-list_heading">Current Breed Selection</h3>
          <ul className="breeds-list">
            {selectedBreeds.map((breed, index) => (
              <li key={index}>
                {breed}
                <button
                  className="breeds-list_button"
                  onClick={() => removeBreed(breed)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
