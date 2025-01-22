import React from "react";
import AllProducts from "../components/products/AllProducts";

const MarketPlace = () => {
  return (
    <section className="container mx-auto py-16 lg:py-24">
      <h1 className="text-3xl lg:text-5xl mb-8 text-green-500 text-start">
        Find fresh farm produce at the best price.
      </h1>
      <AllProducts />
    </section>
  );
};

export default MarketPlace;
