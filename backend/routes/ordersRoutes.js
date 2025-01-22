import express from "express";
import { createUserOder } from "../controllers/ordersController.js";

const router = express.Router();

router.post("/create", createUserOder);

export default router;
