import React from "react";
import PropTypes from "prop-types";
import BackButton from "../ui/BackButton";
import { formatCurrency } from "../../utils/helper";

const OrderInfo = ({ orderInformation }) => {
  return (
    <section className="max-w-[1000px] mx-auto py-12 bg-green-50 p-4 my-8 rounded-lg border">
      <BackButton />
      <div className="bg-green-800 p-2 rounded-md flex flex-col gap-2 text-gray-300 ">
        <h3 className="text-xl text-white font-semibold">
          Transaction details
        </h3>
        <p>
          <strong>Status:</strong>
          {orderInformation.transaction_reference.status}
        </p>
        <p>
          <strong>Message:</strong>
          {orderInformation.transaction_reference.message}
        </p>
        <p>
          <strong>TransactionId:</strong>
          {orderInformation.transaction_reference.transaction}
        </p>
        <p>
          <strong>Paystack Ref:</strong>
          {orderInformation.transaction_reference.trxref}
        </p>
      </div>

      <div className="bg-green-800 p-2 rounded-md flex flex-col gap-2 text-gray-300 mt-6">
        <h2 className="text-xl text-white font-semibold">Delivery Info</h2>
        <p>
          <strong>Name:</strong>
          {orderInformation.customer_delivery_info.name}
        </p>
        <p>
          <strong>Email:</strong>
          {orderInformation.customer_delivery_info.email}
        </p>
        <p>
          <strong>Address:</strong>
          {orderInformation.customer_delivery_info.deliveryAddress}
        </p>
      </div>

      <div className="bg-white p-2 rounded-md flex flex-col gap-2 text-gray-300 mt-6">
        <h2 className="text-green-800 text-xl font-semibold mb-4">
          Order Summary
        </h2>
        <p>
          <strong className="text-gray-500 text-lg">Total Amount:</strong>
          {formatCurrency(
            orderInformation.user_cart_summary.totalCartItemsCost
          )}
        </p>

        <p>
          <strong className="text-gray-500 text-lg">Number of items:</strong>
          {orderInformation.user_cart_summary.totalCartItemsQty}
        </p>
      </div>

      <div className="my-6">
        <h3 className="text-xl font-semibold text-green-800 uppercase">
          Items
        </h3>

        <table className="w-full bg-white my-4">
          <thead>
            <tr className="text-left text-green-800 border-green-300">
              <th className="p-4">Name</th>
              <th className="p-4">Image</th>
              <th className="p-4">Price</th>
              <th className="p-4">Quantity</th>
            </tr>
          </thead>

          <tbody>
            {orderInformation.cartItems.map((item) => {
              return (
                <tr
                  key={item.product_id}
                  className="border-b border-green-300 text-gray-500"
                >
                  <td className="p-4">{item.product_name}</td>
                  <td>
                    <img
                      className="w-16"
                      src={item.product_image}
                      alt={item.product_name}
                    />
                  </td>
                  <td className="p-4">{formatCurrency(item.product_price)}</td>
                  <td className="p-4">{item.product_quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderInfo;

OrderInfo.propTypes = {
  orderInformation: PropTypes.object,
};
