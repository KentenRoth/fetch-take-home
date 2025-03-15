import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Dog } from "../types";
import { usePuppies } from "../hooks/usePuppies";
import { usePuppiesInfo } from "../hooks/usePuppiesInfo";

interface DataContextType {
  selectedBreeds: string[];
  setSelectedBreeds: Dispatch<SetStateAction<string[]>>;
  puppies: string[];
  setPuppies: Dispatch<SetStateAction<string[]>>;
  puppiesInfo: Dog[];
  setPuppiesInfo: Dispatch<SetStateAction<Dog[]>>;
  next: string | null;
  prev: string | null;
  loading: boolean;
  error: string | null;
  nextPage: () => void;
  prevPage: () => void;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [puppies, setPuppies] = useState<string[]>([]);
  const [puppiesInfo, setPuppiesInfo] = useState<Dog[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("breed:asc");

  const filters = {
    ageMin: 0,
    ageMax: 0,
    sort: sort,
  };

  const {
    puppies: fetchedPuppies,
    next: nextUrl,
    prev: prevUrl,
    loading: puppiesLoading,
    error: puppiesError,
    nextPage,
    prevPage,
  } = usePuppies(selectedBreeds, filters);

  const {
    puppiesInfo: fetchedPuppiesInfo,
    loading: puppiesInfoLoading,
    error: puppiesInfoError,
  } = usePuppiesInfo(fetchedPuppies);

  useEffect(() => {
    setPuppies(fetchedPuppies);
    setNext(nextUrl);
    setPrev(prevUrl);
    setLoading(puppiesLoading);
    setError(puppiesError);
  }, [fetchedPuppies, nextUrl, prevUrl, puppiesLoading, puppiesError]);

  useEffect(() => {
    setPuppiesInfo(fetchedPuppiesInfo);
  }, [fetchedPuppiesInfo]);

  return (
    <DataContext.Provider
      value={{
        selectedBreeds,
        setSelectedBreeds,
        puppies,
        setPuppies,
        puppiesInfo,
        setPuppiesInfo,
        next,
        prev,
        loading,
        error,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
