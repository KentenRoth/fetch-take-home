import { usePuppiesInfo } from "../../hooks/usePuppiesInfo";
import { PaginationBar } from "../PaginationBar";
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
      <PaginationBar />
      {puppiesInfoLoading && <h2>Finding You're Puppies!</h2>}
      {puppiesInfoError && <h2>{puppiesInfoError}</h2>}
      <div className="wrapper">
        <div className="puppies-grid">
          {puppiesInfo.map((puppy, index) => (
            <PuppiesCard key={index} puppy={puppy} />
          ))}
        </div>
      </div>

      <PaginationBar />
    </>
  );
};
