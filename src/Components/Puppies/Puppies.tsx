import { usePuppiesInfo } from "../../hooks/usePuppiesInfo";
import { PuppiesCard } from "./PuppiesCard";

interface IProps {
  pups: string[];
}

export const Puppies = (props: IProps) => {
  const {
    puppiesInfo,
    loading: puppiesInfoLoading,
    error: puppiesInfoError,
  } = usePuppiesInfo(props.pups);

  return (
    <>
      <h1>Puppies Grid</h1>
      {puppiesInfoLoading && <h2>Finding You're Puppies!</h2>}
      {puppiesInfoError && <h2>{puppiesInfoError}</h2>}
      <div className="puppies-grid">
        {puppiesInfo.map((puppy, index) => (
          <PuppiesCard key={index} puppy={puppy} />
        ))}
      </div>
    </>
  );
};
