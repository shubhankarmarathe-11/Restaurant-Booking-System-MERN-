// it will ensure that the user is already exist or not

import { User } from "../models/UserDetails.js";

// returns true if user found
// returns false if user not found

const IsAUser = async (Email) => {
  try {
    let isUser = await User.findOne({ Email: Email });
    if (isUser == null) return false;
    return true;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export { IsAUser };
