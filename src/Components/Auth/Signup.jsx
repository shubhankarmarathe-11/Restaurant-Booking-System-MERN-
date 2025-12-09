import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../ReUsable/Loader";
import { GoogleLogin } from "../ReUsable/GoogleLogin";

const Signup = () => {
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [number, Setnumber] = useState("");
  const [password, Setpassword] = useState("");
  const userdetail = useContext(UserDetails);
  const navigate = useNavigate();

  const SubmitData = async () => {
    await axios
      .post(
        "/api/signup",
        { name: name, email: email, number: number, password: password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status == 200) return navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const GetInfo = async () => {
    await axios
      .get("/api/IsActive", { withCredentials: true })
      .then((res) => {
        if (res.data.isactive) {
          userdetail.Setuser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        userdetail.Setuser({});
      });
  };

  useEffect(() => {
    if (userdetail.user.isactive) return navigate("/");
    GetInfo();
  }, []);

  return (
    <>
      {userdetail.user.isactive == true ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="flex-1 h-screen flex flex-col items-center justify-center">
          <span className="rounded-2xl sm:w-2xl shadow w-96 sm:p-5 border-s-slate-950 sm:border">
            <h2 className="text-3xl text-center my-2 w-full">🔐 Signup Now</h2>
            <form
              className="flex flex-col rounded my-5 p-2 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                SubmitData();
              }}
            >
              <p className="my-2 text-left">👤 Name</p>
              <input
                className="rounded outline-blue-500 outline-1 p-2 my-3"
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => Setname(e.target.value)}
              />
              <p className="my-2 text-left">✉️ Email</p>
              <input
                className="rounded outline-blue-500 outline-1 p-2 my-3"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => Setemail(e.target.value)}
              />
              <p className="my-2 text-left">📞 Mobile Number</p>
              <input
                className="rounded outline-blue-500 outline-1 p-2 my-3"
                type="text"
                placeholder="Enter Your Mobile Number"
                value={number}
                onChange={(e) => Setnumber(e.target.value)}
              />
              <p className="my-2 text-left">🔑 Password</p>
              <input
                className="rounded outline-blue-500 outline-1 p-2 my-3"
                type="password"
                placeholder="Create Your Password"
                value={password}
                onChange={(e) => Setpassword(e.target.value)}
              />
              <button
                className="bg-black text-white my-3 p-3 rounded cursor-pointer shadow"
                type="submit"
              >
                Signup
              </button>
              <p className="my-2 text-center">----or----</p>
              {/* code for google login*/}
              <span className="flex justify-center items-center">
                <GoogleLogin />
              </span>
              <Link
                to={"/login"}
                className="text-violet-500 my-3 text-center underline"
              >
                Login Now
              </Link>
            </form>
          </span>
        </div>
      )}
    </>
  );
};

export { Signup };
