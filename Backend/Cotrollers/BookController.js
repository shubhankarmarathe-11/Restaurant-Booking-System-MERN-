import { Table } from "../models/TableDetails.js";
import { Booking } from "../models/TableBooking.js";
import { SendMail } from "../utils/EmailService.js";
import { User } from "../models/UserDetails.js";

const SeperateID = async (array) => {
  try {
    let tableIds = [];
    for (let value of array) {
      let tableDoc = await Table.findOne({ TableNumber: value });

      if (!tableDoc) {
        return false;
      }

      tableIds.push(tableDoc._id);
    }
    return tableIds;
  } catch (error) {
    console.log(error);

    return false;
  }
};

const Bookcontroller = async (req, res) => {
  try {
    let { tablenumbers, date, time } = req.body; //tablenumbers is array

    let userid = req.user_id;

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let tableIds = await SeperateID(tablenumbers);

    if (tableIds == false) return res.status(401).send("table not found");

    let booking = await Booking.create({
      UserDetail: userid,
      Time: time,
      Date: date,
    });
    await booking.save();

    await Booking.findOneAndUpdate(
      { UserDetail: userid, createdAt: booking.createdAt },
      { $push: { BookedTables: { $each: tableIds } } }
    );

    let r = await SendMail({
      name: user.Name,
      email: user.Email,
      tablenumbers: tablenumbers,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      guests: 4,
    });

    if (r == false) {
      console.log("Email sending failed:");
      let undobooking = await Booking.findOneAndDelete({
        createdAt: booking.createdAt,
        UserDetail: userid,
      });
      await undobooking.save();

      for (let value of tablenumbers) {
        let ChangeStaus = await Table.findOne({ TableNumber: value });
        if (ChangeStaus == null)
          return res.status(401).send("please try again");
        ChangeStaus.ReservationStatus = false;
        await ChangeStaus.save();
      }

      return res.status(400).send("please try again");
    }

    return res.status(200).json({
      message: "Tables booked successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
  }
};

export { Bookcontroller };
