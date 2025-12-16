import express from "express";
import {
  SendInfofun,
  SendInfobookedtable,
  Senditemdetail,
  SendCartItems,
} from "../Cotrollers/SendInfoController.js";

const SendInfo = express.Router();

SendInfo.get("/opentables", SendInfofun);
SendInfo.get("/bookedtables", SendInfobookedtable);
SendInfo.get("/getitems", Senditemdetail);
SendInfo.get("/getcartitems", SendCartItems);

export { SendInfo };
