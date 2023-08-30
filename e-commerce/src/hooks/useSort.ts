/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Product as ProductType } from "@/types";


export default function useSort(products: ProductType[]): [Dispatch<SetStateAction<string>>, ProductType[], string] {
    const [productsToShow, setProductsToShow] = useState<ProductType[]>(products);
    const [sort, setSort] = useState<string>("");
    useEffect(() => {
      if (!sort) {
        setProductsToShow(products); // Reset the productsToShow when sort is not applied
        return;
      }
  
      let sortedProducts = [...productsToShow];
  
      if (sort === "lowestPrice") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "highestPrice") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sort === "rating") {
        sortedProducts.sort((a, b) => b.rating - a.rating);
      } else if (sort === "alphabetical") {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      }
  
      setProductsToShow(sortedProducts);
    }, [sort, products]);
  
    return [setSort, productsToShow, sort];
  }