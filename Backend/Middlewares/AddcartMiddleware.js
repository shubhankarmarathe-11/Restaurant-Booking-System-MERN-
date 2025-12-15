const AddcartMiddleware = async (req, res) => {
  try {
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please try again");
    let r = await VerifyToken(token);
    if (r == null || r == false)
      return res.status(400).send("please try again");

    req.user_id = r.data;
  } catch (error) {
    console.log(error);
    res.status(400).send("please try again");
  }
};

export { AddcartMiddleware };
