import { useState, useEffect, useCallback } from "react";
import axios from "../axios/axios";

interface FilterOptions {
  ageMin?: number;
  ageMax?: number;
  sort?: string;
}

export const usePuppies = (
  selectedBreeds: string[],
  filters: FilterOptions = {}
) => {
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
    if (selectedBreeds.length === 0) {
      setPuppies([]);
      setNext(null);
      setPrev(null);
      setLoading(false);
      return;
    }
    console.log(filters);
    const breedsQuery = selectedBreeds
      .map((breed) => `breeds=${breed}`)
      .join("&");
    const ageMinQuery = filters.ageMin ? `&ageMin=${filters.ageMin}` : "";
    const ageMaxQuery = filters.ageMax ? `&ageMax=${filters.ageMax}` : "";
    const sortQuery = filters.sort ? `&sort=${filters.sort}` : "";
    const initialUrl = `/dogs/search?${breedsQuery}${ageMinQuery}${ageMaxQuery}${sortQuery}&size=16`;

    axios
      .get(initialUrl)
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
  }, [selectedBreeds, JSON.stringify(filters)]);

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
