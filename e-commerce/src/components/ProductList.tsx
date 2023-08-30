/* eslint-disable react-hooks/exhaustive-deps */
import { Product as ProductType } from "@/types";
import Product from "./Product";
import { useEffect, useState } from "react";
import useSort from "@/hooks/useSort";

export default function ProductList({
  products,
  filters = false,
  loading = false,
  sorts = true
}: {
  products: ProductType[];
  filters: boolean;
  loading: boolean;
  sorts: boolean
}) {
  const [setSort, sortedProducts, sort] = useSort(products);

  console.log(products)

  return (
    <div className="flex">
      {/* Filter Column */}
      {filters && <div className="w-1/4 p-4 pr-2 pt-0"></div>}

      {/* Product Grid */}
      <div className="flex-1 p-4 pl-2 pt-0">
        <div className="flex w-full">





          {sorts && (
            <ul className="flex space-x-4 py-4">
              {/* <li
                onClick={() =>
                  setSort((sort) => {
                    console.log(sort);
                    if (sort === "popular") {
                      return "";
                    } else {
                      return "popular";
                    }
                  })
                }
                className={`p-2 bg-slate-500/10 rounded border-[black]/10 border-[1px]  cursor-pointer ${
                  sort === "popular"
                    ? "bg-slate-500/40"
                    : "hover:border-[black]/20 hover:bg-slate-500/30"
                }`}
              >
                Popular
              </li> */}
              <li
                onClick={() =>
                  setSort((sort) => {
                    console.log(sort);
                    if (sort === "lowestPrice") {
                      return "";
                    } else {
                      return "lowestPrice";
                    }
                  })
                }
                className={`p-2 bg-slate-500/10 rounded border-[black]/10 border-[1px] cursor-pointer ${
                  sort === "lowestPrice"
                    ? "bg-slate-500/40"
                    : "hover:border-[black]/20 hover:bg-slate-500/30"
                }`}
              >
                Lowest Price
              </li>
              <li
                onClick={() =>
                  setSort((sort) => {
                    console.log(sort);
                    if (sort === "highestPrice") {
                      return "";
                    } else {
                      return "highestPrice";
                    }
                  })
                }
                className={`p-2 bg-slate-500/10 rounded border-[black]/10 border-[1px]  cursor-pointer ${
                  sort === "highestPrice"
                    ? "bg-slate-500/40"
                    : "hover:border-[black]/20 hover:bg-slate-500/30"
                }`}
              >
                Highest Price
              </li>
              <li
                onClick={() =>
                  setSort((sort) => {
                    console.log(sort);
                    if (sort === "rating") {
                      return "";
                    } else {
                      return "rating";
                    }
                  })
                }
                className={`p-2 bg-slate-500/10 rounded border-[black]/10 border-[1px]  cursor-pointer ${
                  sort === "rating"
                    ? "bg-slate-500/40"
                    : "hover:border-[black]/20 hover:bg-slate-500/30"
                }`}
              >
                Rating
              </li>
              <li
                onClick={() =>
                  setSort((sort) => {
                    console.log(sort);
                    if (sort === "alphabetical") {
                      return "";
                    } else {
                      return "alphabetical";
                    }
                  })
                }
                className={`p-2 bg-slate-500/10 rounded border-[black]/10 border-[1px]  cursor-pointer ${
                  sort === "alphabetical"
                    ? "bg-slate-500/40"
                    : "hover:border-[black]/20 hover:bg-slate-500/30"
                }`}
              >
                Alphabetical
              </li>
            </ul>
          )}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {!loading ? (sortedProducts as ProductType[]).map((product) => (
            <Product key={product.id} product={product} />
          )) : "Loading"}
        </div>
      </div>
    </div>
  );
}
