interface IProps {
  breeds: string[];
  removeBreed: (breed: string) => void;
}

export const BreedsList = (props: IProps) => {
  return (
    <div className="breeds-list">
      {props.breeds.length === 0 ? (
        ""
      ) : (
        <>
          <h3 className="breeds-list_heading">Current Breed Selection</h3>
          <ul className="breeds-list">
            {props.breeds.map((breed, index) => (
              <li key={index}>
                {breed}
                <button
                  className="breeds-list_button"
                  onClick={() => props.removeBreed(breed)}
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
