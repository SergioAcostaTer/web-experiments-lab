"use client";
import React from "react";
import useCart from "@/hooks/useCart";
import Product from "@/components/Product";
import ProductCart from "@/components/ProductCart";

export default function Cart() {
  const cart = useCart((state) => state.cart);

  return (
    <div className="bg-gray-100 py-10 min-h-[100vh] h-full">
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.map((e, i) => {
            return <ProductCart key={i} product={e} />;
          })}
        </div>
        <div className="md:mt-0 md:w-1/3 ">
            <div className="p-6 rounded-lg border bg-white md:fixed shadow-md md:w-[250px] lg:w-[320px] box-border">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${(cart.reduce((total, item) => total + item.quantity * item.price, 0 )).toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">{cart.length > 0 ? "$4.99" : "$0.00"}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${(cart.reduce((total, item) => total + item.quantity * item.price, 0 ) + (cart.length > 0 ? 4.99 : 0)).toFixed(2)} USD</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
