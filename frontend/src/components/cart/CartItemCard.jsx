import React from "react";
import { Plus, Minus } from "lucide-react";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helper";
import { useDispatch } from "react-redux";
import {
  decreaseCartQuantity,
  deleteCartItem,
  increaseCartQuantity,
} from "../../features/cart/cartSlice.js";

const CartItemCard = ({
  product_id,
  product_name,
  product_price,
  product_image,
  product_quantity,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center border-b border-green-70 p-3">
      <img className="w-24" src={product_image} alt="" />
      <div>
        <div>
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            {product_name}
          </h2>
          <p className="text-gray-500 font-light text-lg">
            <span>{formatCurrency(product_price)}</span> x{" "}
            <span>{product_quantity}</span>
          </p>
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-4 bg-white p-2 rounded-md border">
              <button
                onClick={() => dispatch(decreaseCartQuantity(product_id))}
                className="hover:text-green-700 cursor-pointer"
              >
                <Minus />
              </button>
              <span>{product_quantity}</span>
              <button
                onClick={() => dispatch(increaseCartQuantity(product_id))}
                className="hover:text-green-700 cursor-pointer"
              >
                <Plus />
              </button>
            </div>

            <button
              onClick={() => dispatch(deleteCartItem(product_id))}
              className="underline underline-offset-[10] text-gray-500 font-medium hover:text-green-700 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

CartItemCard.protoTypes = {
  product_id: PropTypes.string,
  product_image: PropTypes.string,
  product_name: PropTypes.string,
  product_price: PropTypes.number,
  product_quantity: PropTypes.number,
};
