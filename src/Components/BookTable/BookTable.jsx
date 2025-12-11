import { useEffect, useState, useContext } from "react";
import { UserDetails } from "../../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../ReUsable/Navbar";
import { Footer } from "../ReUsable/Footer";
import Loader from "../ReUsable/Loader";
import { GoogleLogin } from "../ReUsable/GoogleLogin";
import { ToastContainer, toast, Bounce } from "react-toastify";

const BookTable = () => {
  const [openTables, setOpenTables] = useState([]);
  const [resfresh, setrefresh] = useState(true);
  const [loading, Setloading] = useState(true);
  let userdetail = useContext(UserDetails);

  const [selectedTables, setSelectedTables] = useState([]);
  const [email, Setemail] = useState("");
  const [name, Setname] = useState("");
  const [number, Setnumber] = useState("");
  const [date, Setdate] = useState("");
  const [time, Settime] = useState("");

  const navigate = useNavigate();

  const ResetValue = async () => {
    Setemail("");
    Setname("");
    Setnumber("");
    Setdate("");
    Settime("");
    setSelectedTables([]);
    setrefresh(!resfresh);
  };

  const handleSelect = (value) => {
    if (selectedTables.includes(value)) {
      setSelectedTables(selectedTables.filter((v) => v !== value));
    } else {
      setSelectedTables([...selectedTables, value]);
    }
  };

  const HandleSubmit = async () => {
    if (userdetail.user.isactive == (false || undefined)) {
      return navigate("/login");
    }

    await axios
      .post(
        "/api/tablebooking",
        {
          tablenumbers: selectedTables,
          date: date,
          time: time,
        },
        { withCredentials: true }
      )

      .then(async (res) => {
        if (res.status == 200) {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          await ResetValue();
        }
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  const GetTableInfo = async () => {
    await axios
      .get("/api/opentables", { withCredentials: true })
      .then((res) => {
        if (!res.data.status) {
          setOpenTables([]);
        } else {
          setOpenTables(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetInfo = async () => {
    await axios
      .get("/api/IsActive", { withCredentials: true })
      .then((res) => {
        if (res.data.isactive) {
          userdetail.Setuser(res.data);
          setTimeout(() => {
            Setloading(false);
          }, 500);
        }
        setTimeout(() => {
          Setloading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          Setloading(false);
        }, 500);
      });
  };

  useEffect(() => {
    GetTableInfo();
    if (userdetail.user.isactive == true) {
      Setloading(false);
      Setemail(userdetail.user.email);
      Setname(userdetail.user.name);
      Setnumber(userdetail.user.mnumber);
    } else {
      GetInfo();
    }
  }, [resfresh]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <Navbar />
          <div className="flex-1 flex flex-col-reverse sm:flex-row sm:justify-between py-5 my-5">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:w-5xl"
            >
              <h2 className="text-center text-2xl">Fill Booking Details</h2>
              <input
                className="m-2 p-2 outline-blue-600 outline-1 border-0 rounded "
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  Setname(e.target.value);
                }}
              />
              <input
                className="m-2 p-2 outline-blue-600 outline-1  border-0 rounded "
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  Setemail(e.target.value);
                }}
              />
              <input
                className="m-2 p-2 outline-blue-600 outline-1  border-0 rounded "
                type="text"
                placeholder="Enter Mobile Number"
                value={number}
                onChange={(e) => {
                  Setnumber(e.target.value);
                }}
              />
              <p className="m-2">Select Date - </p>
              <input
                className="m-2 p-2 outline-blue-600 outline-1 w-auto  border-0 rounded "
                type="date"
                placeholder=""
                value={date}
                onChange={(e) => {
                  Setdate(e.target.value);
                }}
              />
              <p className="m-2">Select Time - </p>
              <input
                className="m-2 p-2 outline-blue-600 outline-1 w-auto border-0 rounded "
                type="time"
                placeholder=""
                value={time}
                onChange={(e) => {
                  Settime(e.target.value);
                }}
              />
              <span className="flex flex-wrap flex-row items-center">
                <p className="m-2">Selected Table Number - </p>
                {selectedTables.map((u) => {
                  return <p className="mx-2 font-bold">{u}</p>;
                })}
              </span>

              <button
                onClick={HandleSubmit}
                className="bg-black text-white m-2 p-3 rounded cursor-pointer shadow"
              >
                Book Table
              </button>
            </form>
            <span className="sm:w-full overflow-y-auto p-5">
              <h2 className="text-center text-2xl my-5 sm:text-3xl">
                Select a Table to Book
              </h2>
              <h2 className="m-2 font-bold sm:text-center">
                Available Tables for 4
              </h2>
              <span className="flex flex-row flex-wrap items-center sm:justify-center">
                {openTables.map(
                  ({ _id, TableNumber, Seats, ReservationStatus }) => (
                    <button
                      key={_id}
                      value={TableNumber}
                      onClick={() => handleSelect(TableNumber)}
                      className={`m-2 p-3 w-20 h-20 rounded cursor-pointer shadow-black shadow
      ${selectedTables.includes(TableNumber) ? "bg-blue-400" : "bg-white"}`}
                    >
                      {TableNumber}
                    </button>
                  )
                )}
              </span>
              <h2 className="m-2 font-bold sm:text-center">
                Available Tables for 5
              </h2>
              <span className="flex flex-row flex-wrap items-center sm:justify-center"></span>
              <h2 className="m-2 font-bold sm:text-center">
                Available Tables for 6
              </h2>
              <span className="flex flex-row flex-wrap items-center sm:justify-center"></span>
            </span>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export { BookTable };
