import { IsAUser } from "../utils/IsAUser.js";

const LoginMiddleware = async (req, res, next) => {
  let { email } = req.body;
  let result = await IsAUser(email);
  if (result == true) return next();
  res.status(401).send("invalid email");
};

export { LoginMiddleware };
