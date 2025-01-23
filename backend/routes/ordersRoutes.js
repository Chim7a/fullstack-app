import express from "express";
import {
  createUserOder,
  getAllOrders,
  getSingleOrderInfo,
} from "../controllers/ordersController.js";

const router = express.Router();

router.post("/create", createUserOder);
router.get("/all-order", getAllOrders);
router.get("/order-info/:orderId", getSingleOrderInfo);

export default router;
