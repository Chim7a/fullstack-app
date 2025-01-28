import { OrderModel } from "../models/orderModel.js";

const createUserOder = async (req, res) => {
  const { reference, checkoutFormData, userCartSummary, cartItems } = req.body;

  // Check for validity.
  if (!reference) {
    return res
      .status(400)
      .send({ message: "Please provide transaction reference" });
  }

  if (!checkoutFormData) {
    return res.status(400).send({ message: "Please provide customer details" });
  }

  if (!userCartSummary) {
    return res.status(400).send({ message: "Please cart summary is required" });
  }

  if (!cartItems) {
    return res.status(400).send({ message: "Please provide cart items" });
  }

  try {
    // To create a new document in mongo DB.
    const result = await OrderModel.create({
      transaction_reference: {
        transaction: reference.transaction,
        status: reference.status,
        trxref: reference.trxref,
        message: reference.message,
      },
      customer_delivery_info: {
        name: checkoutFormData.name,
        email: checkoutFormData.email,
        deliveryAddress: checkoutFormData.deliveryAddress,
      },
      // Alternative way to write it.
      user_cart_summary: userCartSummary,
      cartItems: cartItems,
    });

    res
      .status(201)
      .send({ data: result, message: "Order created successfully" });
  } catch (error) {
    return res
      .status(400)
      .send({ error, message: "Order created unsuccessful" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json({ message: "successful", data: orders });
  } catch (error) {
    res.status(400).json({ message: "failed", data: error });
  }
};

// Sent to the OrderDetails.jsx page
const getSingleOrderInfo = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    return res
      .status(400)
      .json({ message: "Sorry provide order Id", data: null });
  }

  try {
    const order = await OrderModel.findOne({ _id: orderId });

    res.status(200).json({ message: "Successful", data: order });
  } catch (error) {
    res.status(400).json({ message: "Sorry an error occurred", data: error });
  }
};

export { createUserOder, getAllOrders, getSingleOrderInfo };
