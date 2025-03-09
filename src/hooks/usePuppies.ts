import { useState, useEffect, useCallback } from "react";
import axios from "../axios/axios";

export const usePuppies = (selectedBreeds: string[]) => {
  const [puppies, setPuppies] = useState<string[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const paginationPuppies = useCallback((url: string) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setPuppies(res.data.resultIds);
        setNext(res.data.next);
        setPrev(res.data.prev);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const breedsQuery = selectedBreeds
      .map((breed) => `breeds=${breed}`)
      .join("&");
    axios
      .get(`/dogs/search?${breedsQuery}&size=16`)
      .then((res) => {
        setPuppies(res.data.resultIds);
        setNext(res.data.next);
        setPrev(res.data.prev);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [selectedBreeds, paginationPuppies]);

  const nextPage = () => {
    if (next) {
      paginationPuppies(next);
    }
  };

  const prevPage = () => {
    if (prev) {
      paginationPuppies(prev);
    }
  };

  return { puppies, next, prev, loading, error, nextPage, prevPage };
};
