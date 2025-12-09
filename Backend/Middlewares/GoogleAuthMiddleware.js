import { validateToken } from "../utils/GoogleAuthfunctions.js";
import { User } from "../models/UserDetails.js";
import { SignToken } from "../utils/JwtToken.js";

const GoogleAuthMiddleware = async (req, res, next) => {
  try {
    let { google_token } = req.body;
    // console.log(google_token);

    let r = await validateToken(google_token);

    if (r == false) return res.status(401).send("invalid token");

    const payload = r.getPayload();
    const { email } = payload;
    let IsUser = await User.findOne({ Email: email });

    req.payload = payload;
    if (IsUser == null) return next();

    let result = await SignToken(String(IsUser._id));
    if (result == false) return res.status(401).send("please try again");
    res.cookie("host_auth", result, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 60 * 1000,
    });
    res.status(200).send("Success");
  } catch (err) {
    console.log(err);
    res.status(400).send("please try again");
  }
};

export { GoogleAuthMiddleware };
