import { useState, useEffect } from "react";
import axios from "../axios/axios";

export const usePuppies = (selectedBreeds: string[]) => {
  const [puppies, setPuppies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(
        `/dogs/search?${selectedBreeds.map(
          (breed) => `breeds=${breed}`
        )}&size=16`
      )
      .then((res) => {
        setPuppies(res.data.resultIds);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [selectedBreeds]);
  return { puppies, loading, error };
};
