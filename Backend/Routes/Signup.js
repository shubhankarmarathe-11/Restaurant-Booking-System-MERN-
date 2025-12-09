import express from "express";
import { Signup } from "../Cotrollers/SignupController.js";
import { SignupMiddleware } from "../Middlewares/SignupMiddlewares.js";
const SignupRoute = express.Router();

SignupRoute.get("/signup", (req, res) => {
  res.send("signup route");
});

SignupRoute.post("/signup", SignupMiddleware, Signup);

export { SignupRoute };
