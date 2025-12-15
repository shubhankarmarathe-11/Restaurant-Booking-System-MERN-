import express from "express";
import { Addcartcontroller } from "../Cotrollers/AddcartController.js";
import { AddcartMiddleware } from "../Middlewares/AddcartMiddleware.js";

const CartRoute = express.Router();

CartRoute.post("/addcart", AddcartMiddleware, Addcartcontroller);

export { CartRoute };
