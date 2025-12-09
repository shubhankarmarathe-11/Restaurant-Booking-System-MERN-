import express from "express";
import { Login } from "../Cotrollers/LoginController.js";
import { LoginMiddleware } from "../Middlewares/LoginMiddleware.js";

const LoginRoute = express.Router();
LoginRoute.get("/login", (req, res) => {
  res.send("login route");
});

LoginRoute.post("/login", LoginMiddleware, Login);

export { LoginRoute };
