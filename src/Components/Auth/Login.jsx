import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserDetails } from "../../Context/LoginContext";
import Loader from "../ReUsable/Loader";
import { GoogleLogin } from "../ReUsable/GoogleLogin";

const Login = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [loading, Setloading] = useState(true);

  const userdetail = useContext(UserDetails);
  const navigate = useNavigate();

  const SubmitData = async () => {
    await axios
      .post(
        "/api/login",
        { email: email, password: password },
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
    if (userdetail.user.isactive == true) return navigate("/");
    await axios
      .get("/api/IsActive", { withCredentials: true })
      .then((res) => {
        if (res.data.isactive) {
          userdetail.Setuser(res.data);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        Setloading(false);
      });
  };

  useEffect(() => {
    GetInfo();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="flex-1 h-screen flex flex-col items-center justify-center">
          <span className="rounded-2xl sm:w-2xl shadow w-96 sm:p-5 border-s-slate-950 sm:border">
            <h2 className="text-3xl text-center my-2 w-full">🔐 Login Now</h2>
            <form
              className="flex flex-col rounded my-5 p-2 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                SubmitData();
              }}
            >
              <p className="my-2 text-left">✉️ Email</p>
              <input
                className="rounded outline-blue-500 outline-1 p-2 my-3"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => Setemail(e.target.value)}
              />
              <p className="my-2 text-left">🔑 Password</p>
              <input
                className="rounded outline-blue-500 outline-1 p-2 my-3"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => Setpassword(e.target.value)}
              />
              <button
                className="bg-black text-white my-3 p-3 rounded cursor-pointer shadow"
                type="submit"
              >
                Login
              </button>
              <p className="my-2 text-center">----or----</p>
              <span className="flex justify-center items-center">
                <GoogleLogin />
              </span>
              {/* code for google login*/}
              <Link
                to={"/signup"}
                className="text-violet-500 my-3 text-center underline"
              >
                Create Account
              </Link>
            </form>
          </span>
        </div>
      )}
    </>
  );
};

export { Login };
