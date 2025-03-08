import { Dog } from "../../types";

interface IProps {
  puppy: Dog;
}

export const PuppiesCard = (props: IProps) => {
  const { puppy } = props;
  return (
    <div className="puppy-card">
      <div className="puppy-card__image">
        <img src={puppy.img} alt="puppy" />
      </div>
      <div className="puppy-card__info">
        <h2>{puppy.name}</h2>
        <p>{puppy.breed}</p>
        <p>{puppy.age}</p>
        <p>{puppy.zip_code}</p>
      </div>
    </div>
  );
};
