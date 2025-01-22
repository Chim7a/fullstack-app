import React from "react";
import ProductCard from "./ProductCard";
import { PRODUCT_DATA } from "../constants/data";

const ProductList = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
      {PRODUCT_DATA.map((item, index) => {
        return (
          <ProductCard
            key={index}
            product_id={item.product_id}
            product_name={item.product_name}
            product_price={item.product_price}
            product_image={item.product_image}
            product_quantity={item.product_quantity}
            product_description={item.product_description}
          />
        );
      })}
    </section>
  );
};

export default ProductList;
