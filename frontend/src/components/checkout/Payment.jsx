import { usePaystackPayment } from "react-paystack";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { clearUserCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router";
import axios from "axios";

const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_TEST_KEY;

const Payment = ({ checkoutFormData }) => {
  const { userCartSummary, cartItems } = useSelector((state) => state.cart);

  const config = {
    reference: new Date().getTime().toString(),
    email: checkoutFormData.email,
    amount: userCartSummary.totalCartItemsCost * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200. Always multiply by 100. standard practice.
    publicKey: PAYSTACK_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // you can call this function anything
  const onSuccess = async (reference) => {
    try {
      alert("Payment was made successfully");
      // Implementation for whatever you want to do with reference and after success call.

      if (reference) {
        // console.log(reference);
        // console.log(checkoutFormData);
        // console.log(userCartSummary);
        // console.log(cartItems);

        // Data to be sent to the backend.
        const response = await axios.post(
          "http://localhost:3000/api/v1/order/create",
          {
            reference,
            checkoutFormData,
            userCartSummary,
            cartItems,
          }
        );

        console.log(response);

        dispatch(clearUserCart());
        localStorage.removeItem("cartSummary");
        localStorage.removeItem("userCart");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.

    alert("Payment was closed");
    // console.log("closed");
  };

  function handlePayment() {
    if (checkoutFormData.email.trim() === "") {
      alert("Please provide email");
      return;
    }
    if (checkoutFormData.name.trim() === "") {
      alert("Please provide name");
      return;
    }
    if (checkoutFormData.deliveryAddress.trim() === "") {
      alert("Please provide delivery address");
      return;
    }

    // add curly braces to initializer
    initializePayment({ onSuccess, onClose });
  }

  return (
    <div>
      <button
        className="bg-green-700 w-full py-2 text-lg font-semibold text-white mt-4 rounded-md border-2 border-green-700 hover:bg-white hover:text-green-700 transition-colors duration-300 cursor-pointer"
        onClick={handlePayment}
      >
        Pay now!!!
      </button>
    </div>
  );
};

Payment.propTypes = {
  userEmail: PropTypes.string,
  amount: PropTypes.number,
  checkoutFormData: PropTypes.object,
};

export default Payment;
