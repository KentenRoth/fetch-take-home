import { Dog } from "../../types";
import { HeartIcon } from "../HeartIcon";

interface IProps {
  puppy: Dog;
}

export const PuppiesCard = (props: IProps) => {
  const { puppy } = props;
  let fill = "#eb5e28";

  return (
    <div className="puppy-card">
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
