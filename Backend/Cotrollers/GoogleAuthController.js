import { User } from "../models/UserDetails.js";
import { SignToken } from "../utils/JwtToken.js";

const GoogleAuth = async (req, res) => {
  try {
    let { email, name, picture, sub } = req.payload;
    let CreateUser = await User.create({
      Email: email,
      Name: name,
      ProfileUrl: picture,
      GoogleId: sub,
    });
    await CreateUser.save();

    let result = await SignToken(String(CreateUser._id));
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
  } catch (error) {
    console.log(error);
    res.status(400).send("please try again");
  }
};

export { GoogleAuth };
