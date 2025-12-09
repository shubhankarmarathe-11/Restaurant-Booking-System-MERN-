import express from "express";
import {
  SendInfofun,
  SendInfobookedtable,
} from "../Cotrollers/SendInfoController.js";

const SendInfo = express.Router();

SendInfo.get("/opentables", SendInfofun);
SendInfo.get("/bookedtables", SendInfobookedtable);

export { SendInfo };
