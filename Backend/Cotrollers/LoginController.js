import { User } from "../models/UserDetails.js";
import bcrypt from "bcryptjs";
import { SignToken } from "../utils/JwtToken.js";

const Login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ Email: email });
    if (user == null) return res.status(400).send("invalid email");

    let comparepass = await bcrypt.compare(String(password), user.Password);
    console.log(comparepass);
    if (comparepass == false) return res.status(400).send("invalid password");

    let result = await SignToken(String(user._id));
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
    res.status(401).send("please try again");
  }
};

export { Login };
