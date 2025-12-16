import { Cartitem } from "../models/CartDetails.js";
import { Fooditem } from "../models/FoodItem.js";

// async function CountPrice(array) {
//   let price = 0;
//   for (let v of array) {
//     let FindPrice = await Fooditem.findById(v.Foodid);
//     price += await (FindPrice.Price * v.Quantity);
//   }
//   return price;
// }

const Addcartcontroller = async (req, res) => {
  try {
    let { Foodid, Quantity } = req.body;

    let userid = req.user_id;

    await Cartitem.findOneAndUpdate(
      { UserDetail: userid },
      { $push: { Fooditems: { Foodid: Foodid, Quantity: Quantity } } }
    );

    res.status(200).send("Added to cart");
  } catch (error) {
    console.log(error);
    res.status(400).send("please try again");
  }
};

export { Addcartcontroller };
