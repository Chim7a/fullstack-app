import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PRODUCT_DATA } from "../constants/data";
import { formatCurrency } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../features/cart/cartSlice";
import { message } from "antd";
import BackButton from "../../utils/BackButton";

const ProductInfo = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [messageApi, contextHolder] = message.useMessage();

  function findProduct() {
    const product = PRODUCT_DATA.find(
      (item) => item.product_id === params.productId
    );

    setSingleProduct(product);
  }

  useEffect(() => {
    findProduct();
  }, []);

  function handleAddCartItem() {
    const productAlreadyInCart = cartItems.find((item) => {
      return item.product_id === params.productId;
    });
    if (productAlreadyInCart === undefined) {
      dispatch(addCartItem(singleProduct));
      messageApi.success("Product added to cart");
    } else {
      messageApi.error("Product already added to cart");
    }
  }

  if (singleProduct === null) {
    return (
      <div>
        <h1>Loading Product data...</h1>
      </div>
    );
  }

  return (
    <section className="max-w-[800px] mx-auto my-16">
      {contextHolder}
      <BackButton />
      <section className="bg-green-50  p-4 rounded-lg">
        <img
          className="w-[700px] h-[500px] object-cover mx-auto"
          src={singleProduct.product_image}
          alt={singleProduct.product_name}
        />
        <h1 className="text-3xl font-semibold text-green-800 my-4">
          {singleProduct.product_name}
        </h1>
        <h3 className="text-xl mb-4 text-green-950 font-bold">
          {formatCurrency(singleProduct.product_price)}
        </h3>
        <p className="text-gray-500 font-light text-base md:text-lg">
          {singleProduct.product_description}
        </p>

        <button
          onClick={handleAddCartItem}
          className="bg-green-700 w-full py-2 text-lg font-semibold text-white mt-4 rounded-md border-2 border-green-700 hover:bg-white hover:text-green-700 transition-colors duration-300 cursor-pointer"
        >
          Add to cart
        </button>
      </section>
    </section>
  );
};

export default ProductInfo;
