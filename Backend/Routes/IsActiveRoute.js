import express from "express";
import { IsActiveUser } from "../Cotrollers/IsActiveController.js";

const IsActive = express.Router();

IsActive.get("/IsActive", IsActiveUser);

// for sending table status info

export { IsActive };
