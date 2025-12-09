import express from "express";
import { BookMiddleware } from "../Middlewares/BookMiddleware.js";
import { Bookcontroller } from "../Cotrollers/BookController.js";

const BookTable = express.Router();

BookTable.post("/tablebooking", BookMiddleware, Bookcontroller);

export { BookTable };
