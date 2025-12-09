import { Table } from "../models/TableDetails.js";
import { VerifyToken } from "../utils/JwtToken.js";

const BookMiddleware = async (req, res, next) => {
  try {
    let { tablenumbers } = req.body; //tablenumbers is an array of numbers
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please try again");
    let r = await VerifyToken(token);
    if (r == null || r == false)
      return res.status(400).send("please try again");

    req.user_id = r.data;

    for (let value of tablenumbers) {
      let ChangeStaus = await Table.findOne({ TableNumber: value });
      if (ChangeStaus == null) return res.status(401).send("please try again");
      if (ChangeStaus.ReservationStatus == true)
        return res.status(401).send("table not available");
      ChangeStaus.ReservationStatus = true;
      await ChangeStaus.save();
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export { BookMiddleware };
