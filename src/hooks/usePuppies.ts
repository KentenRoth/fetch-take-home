import { useState, useEffect } from "react";
import axios from "../axios/axios";

export const usePuppies = (selectedBreeds: string[]) => {
  const [puppies, setPuppies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const breedsQuery = selectedBreeds
      .map((breed) => `breeds=${breed}`)
      .join("&");
    axios
      .get(`/dogs/search?${breedsQuery}&size=16`)
      .then((res) => {
        console.log(res);
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
