import { User } from "../models/UserDetails.js";
import bcrypt from "bcryptjs";
import { SignToken } from "../utils/JwtToken.js";

const Signup = async (req, res) => {
  try {
    let { name, email, number, password } = req.body;
    password = await bcrypt.hash(String(password), 10);
    let NewUser = await User.create({
      Name: name,
      Email: email,
      Number: number,
      Password: password,
    });
    await NewUser.save();
    let result = await SignToken(String(NewUser._id));
    if (result == false) {
      await User.deleteOne({ Email: email });
      return res.status(401).send("please try again");
    }

    res.cookie("host_auth", result, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 60 * 1000,
    });
    res.status(200).send("Success");
  } catch (err) {
    console.log(err);
    return res.status(401).send("please try again");
  }
};

export { Signup };
