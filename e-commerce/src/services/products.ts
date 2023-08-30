//products.ts
import { Product } from "@/types";
import axios, { AxiosResponse } from "axios";


interface ProductReponse{
  products: Product[]
}

export const getProducts = async (
  category: string | string[]
): Promise<Product[]> => {
  if (category) {
    const response: AxiosResponse<ProductReponse> = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return response.data.products;
  } else {
    const response: AxiosResponse<ProductReponse> = await axios.get(
      "https://dummyjson.com/products?limit=100"
    );
    return response.data.products;
  }
};
