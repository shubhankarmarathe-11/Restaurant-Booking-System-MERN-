import { Table } from "../models/TableDetails.js";
import { Booking } from "../models/TableBooking.js";
import { VerifyToken } from "../utils/JwtToken.js";

const SendInfofun = async (req, res) => {
  try {
    let OpenTables = await Table.find({ ReservationStatus: false });
    if (OpenTables.length == 0)
      return res
        .status(200)
        .send({ status: false, data: "tables not available" });

    res.status(200).send({ status: true, data: OpenTables });
  } catch (error) {
    res.status(400).send("please try again");
  }
};

const SendInfobookedtable = async (req, res) => {
  try {
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please try again");
    let r = await VerifyToken(token);
    if (r == null || r == false)
      return res.status(400).send("please try again");
    let bookedtables = await Booking.find({ UserDetail: r.data });
    if (bookedtables.length == 0)
      return res.status(200).send({ status: false, data: "no data available" });

    let newarr = [];
    let Editedarr = [];

    Editedarr.length = 0;
    newarr.length = 0;

    for (let v of bookedtables) {
      newarr = [];
      for (let v2 of v.BookedTables) {
        let numbers = await Table.findById(v2);
        await newarr.push(numbers.TableNumber);
      }
      Editedarr.push({
        _id: v._id,
        BookedTables: newarr,
        UserDetail: v.UserDetail,
        Date: v.Date,
        Time: v.Time,
        createdAt: v.createdAt,
        updatedAt: v.updatedAt,
        __v: v.__v,
      });
    }
    res.status(200).send({ status: true, data: Editedarr });
  } catch (error) {
    res.status(400).send("please try again");
  }
};

export { SendInfofun, SendInfobookedtable };
