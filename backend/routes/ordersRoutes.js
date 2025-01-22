import express from "express";
import { createUserOder } from "../controllers/OrdersController.js";

const router = express.Router();

router.post("/create", createUserOder);

export default router;
