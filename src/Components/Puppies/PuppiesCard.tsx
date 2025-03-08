import { Dog } from "../../types";

interface IProps {
  puppy: Dog;
  selectedFavorite: boolean;
  onSelectFavorite: (id: string) => void;
}

export const PuppiesCard = (props: IProps) => {
  const { puppy } = props;
  return (
    <div className="puppy-card">
      <div className="puppy-card_image">
        <img src={puppy.img} alt="puppy" />
      </div>
      <div className="puppy-card__info">
        <h3>{puppy.name}</h3>
        <p>{puppy.breed}</p>
        <p>Age: {puppy.age}</p>
        <p>Location: {puppy.zip_code}</p>
      </div>
    </div>
  );
};
