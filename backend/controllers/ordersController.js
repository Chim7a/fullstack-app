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
        transction: reference.transction,
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

export { createUserOder };
