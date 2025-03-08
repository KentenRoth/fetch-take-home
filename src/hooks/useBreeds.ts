import { useState, useEffect } from "react";
import axios from "../axios/axios";

export const useBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/dogs/breeds")
      .then((res) => {
        setBreeds(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  return { breeds, loading, error };
};
