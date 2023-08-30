"use client";
import { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../services/products";
import { Product as ProductType } from "@/types";
import ProductList from "@/components/ProductList";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts("").then((products) => setProducts(products));
  }, []);

  return (
    <main className="">

      <img src={"https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"} className="w-full h-[300px]"></img>

      <ProductList products={products} filters={false} sort loading={false}/>
    </main>
  );
}
