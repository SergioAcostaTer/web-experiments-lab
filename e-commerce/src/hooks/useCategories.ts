import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

function useCategories(): [string[] | null, boolean, string | null] {
  const [categories, setCategories] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response: AxiosResponse<string[]> = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        if (response.status === 200) {
          setCategories(response.data);
        } else {
          setError("Unexpected status code");
        }
      } catch (error) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return [categories, loading, error];
}

export default useCategories;
