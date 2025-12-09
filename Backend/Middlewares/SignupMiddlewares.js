import { IsAUser } from "../utils/IsAUser.js";
import { ValidateEmail, ValidatePassword } from "../utils/FormatCheck.js";

const SignupMiddleware = async (req, res, next) => {
  let { email, password } = req.body;
  let result = await IsAUser(email);
  let isemail = await ValidateEmail(String(email));
  let ispass = await ValidatePassword(String(password));

  if (!isemail) return res.status(400).send("enter proper email");
  if (!ispass)
    return res.status(400).send("password must contain minimum 8 characters");

  if (result == true) return res.status(409).send("user already exist");
  next();
};

export { SignupMiddleware };
