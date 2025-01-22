import { Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Payment from "./Payment";

const CheckoutForm = () => {
  const [checkoutFormData, setCheckoutFormData] = useState({
    name: "",
    email: "",
    deliveryAddress: "",
  });

  const { cartItems, userCartSummary } = useSelector((state) => state.cart);

  // console.log(checkoutFormData);
  // console.log("my cart items", cartItems);
  // console.log("my order summary", userCartSummary);

  //   Condition to check if there are items in the cart before being able to access the checkout
  if (cartItems.length < 1 || userCartSummary < 0) {
    return <Navigate to={"/marketplace"} />;
  }

  return (
    <>
      <form>
        <Input
          onChange={(e) =>
            setCheckoutFormData({ ...checkoutFormData, name: e.target.value })
          }
          size="large"
          placeholder="Enter your name"
        />
        <Input
          onChange={(e) =>
            setCheckoutFormData({ ...checkoutFormData, email: e.target.value })
          }
          size="large"
          placeholder="Enter your email"
        />
        <Input
          onChange={(e) =>
            setCheckoutFormData({
              ...checkoutFormData,
              deliveryAddress: e.target.value,
            })
          }
          size="large"
          placeholder="Enter your delivery address"
        />
      </form>

      <Payment checkoutFormData={checkoutFormData} />
    </>
  );
};

export default CheckoutForm;
