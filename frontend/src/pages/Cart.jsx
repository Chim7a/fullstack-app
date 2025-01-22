import React from "react";
import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import BackButton from "../utils/BackButton";

const Cart = () => {
  return (
    <section className="max-w-[1100px] mx-auto p-4 py-16">
      <h2 className="text-3xl text-green-700 font-bold mb-6">View your cart</h2>
      <BackButton />
      <section className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[70%]">
          <CartList />
        </div>
        <div className="w-full lg:w-[30%] ">
          <CartSummary />
        </div>
      </section>
    </section>
  );
};

export default Cart;
