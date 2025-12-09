import { useState, useEffect, useContext } from "react";
import data from "./DashboardData.json";
import { UserDetails } from "../../Context/LoginContext";

import axios from "axios";

const DashBoard = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, Setnumber] = useState("-");
  const [pic, setpic] = useState("");

  let userdetail = useContext(UserDetails);

  const GetbookingInfo = async () => {
    await axios
      .get("/api/bookedtables", { withCredentials: true })
      .then((res) => {
        if (!res.data.status) {
          setBookingHistory([]);
        } else {
          setBookingHistory(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetbookingInfo();
    if (userdetail.user.isactive == true) {
      setemail(userdetail.user.email);
      setname(userdetail.user.name);
      Setnumber(userdetail.user.mnumber);
      setpic(userdetail.user.pic);
    }
  }, []);

  return (
    <>
      <div className="p-6 sm:flex sm:gap-6">
        {/* LEFT SIDE (Table + Orders) */}
        <div className="mt-6 mb-6 sm:mb-0 sm:mt-0 sm:w-1/3 p-4 border rounded-lg shadow-md flex flex-col items-center">
          <img
            src={pic}
            alt="profile picture"
            className="w-32 h-32 rounded-full object-cover shadow"
          />

          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">{name}</h2>
            <p>{email}</p>
            <p>{number}</p>
          </div>

          {/* Space for Change Password */}
          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
            Change Password
          </button>
        </div>

        {/* RIGHT SIDE (User Box) */}
        <div className="sm:w-2/3 flex flex-col gap-6">
          {/* Table Booking */}
          <div className="p-4 border rounded-lg shadow-md h-60 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Table Reservations</h3>
            {bookingHistory.map((u) => (
              <div key={u._id} className="mb-3 border-b pb-2">
                <p className="font-medium">Date :- {u.Date}</p>
                <p className="font-medium">Time :- {u.Time}</p>
                <p>
                  Tables Booked:{" "}
                  <span className="font-semibold">
                    {u.BookedTables.join(", ")}
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div className="p-4 border rounded-lg shadow-md h-60 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            {data.OrderDetails.map((order, index) => (
              <div key={index} className="mb-3 border-b pb-2">
                <p className="font-medium">Date & Time: {order.Datetime}</p>

                <div className="ml-4">
                  {order.ItemDetails.map((item, idx) => (
                    <p key={idx}>
                      {item.name} — Qty: {item.quantity}
                    </p>
                  ))}
                </div>

                <p className="font-semibold mt-1">
                  Total: ₹{order.TotalAmount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { DashBoard };
