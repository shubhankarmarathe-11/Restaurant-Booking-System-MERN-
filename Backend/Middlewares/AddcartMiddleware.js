import { VerifyToken } from "../utils/JwtToken.js";
import { Cartitem } from "../models/CartDetails.js";

const AddcartMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("Session Expired");
    let r = await VerifyToken(token);
    if (r == null || r == false)
      return res.status(400).send("Please login again");

    req.user_id = r.data;
    let FindData = await Cartitem.findOne({ UserDetail: r.data });
    if (FindData == null) {
      let CreateEntry = await Cartitem.create({ UserDetail: r.data });
      await CreateEntry.save();
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("please try again");
  }
};

export { AddcartMiddleware };
