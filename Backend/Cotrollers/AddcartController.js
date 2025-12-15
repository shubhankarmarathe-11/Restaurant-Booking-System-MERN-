import { Cartitem } from "../models/CartDetails.js";
import { Fooditem } from "../models/FoodItem.js";

async function CountPrice(array) {
  let price = 0;
  for (let v of array) {
    let FindPrice = await Fooditem.findById(v.Foodid);
    price += await (FindPrice.Price * v.Quantity);
  }
  return price;
}

const Addcartcontroller = async (req, res) => {
  try {
    let { cartarray } = req.body;
    let userid = r.user_id;

    let Cal = await CountPrice(cartarray);

    let NewEntry = await Cartitem.create({
      Fooditems: cartarray,
      UserDetail: userid,
      Totalprice: Cal,
    });
    await NewEntry.save();

    res.status(200).send("Added to cart");
  } catch (error) {
    console.log(error);
    res.status(400).send("please try again");
  }
};

export { Addcartcontroller };
