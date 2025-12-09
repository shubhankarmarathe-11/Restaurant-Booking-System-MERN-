import JWT from "jsonwebtoken";

const SignToken = async (data) => {
  try {
    let token = JWT.sign({ data: data }, `${process.env.JWTTOKEN}`, {
      algorithm: "HS512",
      expiresIn: "1800000s",
    });
    return token;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const VerifyToken = async (data) => {
  try {
    let token = JWT.verify(String(data), `${process.env.JWTTOKEN}`, {
      algorithms: "HS512",
    });
    return token;
  } catch (err) {
    if (err.message === "jwt expired") {
      console.log(err.message);
      return false;
    }
    return null;
  }
};

export { SignToken, VerifyToken };
