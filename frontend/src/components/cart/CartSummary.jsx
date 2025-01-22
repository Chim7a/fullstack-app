import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helper";
import { useNavigate } from "react-router";

const CartSummary = () => {
  const { userCartSummary } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  return (
    <div className="bg-green-50 p-2 rounded-md">
      <h3 className="text-xl font-semibold text-green-700 border-b border-green-500 mb-4">
        Cart Summary
      </h3>
      <div className="flex justify-between text-gray-500 font-light text-lg mb-4">
        <p>Items total ({userCartSummary.totalCartItemsQty})</p>
        <h2 className="text-black font-semibold">
          {formatCurrency(userCartSummary.totalCartItemsCost)}
        </h2>
      </div>

      <div className="flex justify-between text-gray-500 font-light text-lg mb-4">
        <p>Subtotal</p>
        <h2 className="text-black font-semibold">
          {formatCurrency(userCartSummary.totalCartItemsCost)}
        </h2>
      </div>

      <button
        onClick={() => {
          navigate("/checkout");
        }}
        className="bg-green-700 w-full py-2 text-lg font-semibold text-white mt-4 rounded-md border-2 border-green-700 hover:bg-white hover:text-green-700 transition-colors duration-300 cursor-pointer"
      >
        Checkout ({formatCurrency(userCartSummary.totalCartItemsCost)})
      </button>
    </div>
  );
};

export default CartSummary;
