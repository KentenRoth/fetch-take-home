import { useEffect, useState } from "react";
import axios from "../axios/axios";

export const usePuppiesInfo = (puppies: string[]) => {
  const [puppiesInfo, setPuppiesInfo] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .post("/dogs", puppies)
      .then((res) => {
        setPuppiesInfo(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [puppies]);
  return { puppiesInfo, loading, error };
};
