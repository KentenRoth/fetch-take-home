import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";

export const useBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get("/dogs/breeds")
      .then((res) => {
        setBreeds(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigator("/login");
        }
        setError(error.message);
        setLoading(false);
      });
  }, []);
  return { breeds, loading, error };
};
