//category/[id] page
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "@/services/products";
import ProductList from "@/components/ProductList";
import { Product } from "@/types";

export default function Category() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts(id).then(setProducts);
    setLoading(false);
  }, [id]);

  const categoryTitle = decodeURI(Array.isArray(id) ? id[0] : id)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div>
      <div className="flex justify-center items-center h-[80px] bg-slate-500/20">
        <h1>{categoryTitle}</h1>
      </div>

      <ProductList products={products} filters loading={loading} />
    </div>
  );
}
