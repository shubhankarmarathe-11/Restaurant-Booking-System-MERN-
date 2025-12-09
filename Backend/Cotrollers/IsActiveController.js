import { VerifyToken } from "../utils/JwtToken.js";
import { User } from "../models/UserDetails.js";

const IsActiveUser = async (req, res) => {
  try {
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please try again");

    let r = await VerifyToken(token);
    if (r == null) return res.status(400).send("please try again");
    if (r == false) return res.status(200).send({ isactive: false });

    let Find = await User.findById(r.data);

    if (Find == null || Find == undefined)
      return res.status(404).json({ message: "User not found" });

    res.status(200).send({
      isactive: true,
      email: Find.Email,
      name: Find.Name,
      mnumber: Find.Number,
      pic: Find.ProfileUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("please try again");
  }
};

export { IsActiveUser };
