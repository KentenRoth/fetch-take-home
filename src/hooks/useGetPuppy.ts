import { useState } from "react";
import axios from "../axios/axios";
import { Dog } from "../types";

export const useGetPuppy = () => {
  const [puppiesInfo, setPuppiesInfo] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPuppy = async (puppies: string[]) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/dogs/match", puppies);
      console.log(res.data.match);
      const resPuppy = await axios.post("/dogs", [res.data.match]);
      setPuppiesInfo(resPuppy.data[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { puppiesInfo, loading, error, fetchPuppy };
};
