import { Dog } from "../../types";
import { HeartIcon } from "../HeartIcon";

interface IProps {
  puppy: Dog;
  toggleFavorites: (puppy: string) => void;
  isFavorite: boolean;
}

// heart fill #eb5e28

export const PuppiesCard = (props: IProps) => {
  const { puppy, toggleFavorites, isFavorite } = props;
  const fill = isFavorite ? "#eb5e28" : "#d9d6d1";

  return (
    <div className="puppy-card" onClick={() => toggleFavorites(puppy.id)}>
      <div className="puppy-card_heart">
        <HeartIcon fill={fill} />
      </div>
      <p className="puppy-card_age">Age: {puppy.age}</p>
      <div className="puppy-card_image">
        <img src={puppy.img} alt="puppy" />
      </div>
      <div className="puppy-card_info">
        <h3 className="puppy-card_info__name">{puppy.name}</h3>
        <p className="puppy-card_info__breed">{puppy.breed}</p>
        <p className="puppy-card_info__zip">Location: {puppy.zip_code}</p>
      </div>
    </div>
  );
};
