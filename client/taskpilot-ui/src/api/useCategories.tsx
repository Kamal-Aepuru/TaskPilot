import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3030/api/categories");
      return res.data;
    },
  });
};
