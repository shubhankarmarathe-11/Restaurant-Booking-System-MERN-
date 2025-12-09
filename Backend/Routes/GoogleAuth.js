import express from "express";
import { GoogleAuth } from "../Cotrollers/GoogleAuthController.js";
import { GoogleAuthMiddleware } from "../Middlewares/GoogleAuthMiddleware.js";

const GoogleauthRoute = express.Router();

GoogleauthRoute.post("/googleauth", GoogleAuthMiddleware, GoogleAuth);

export { GoogleauthRoute };
