import { useState, useContext } from "react";
import axios from "axios";
import { UserDetails } from "../../Context/LoginContext";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ id, img, name, price, alt }) => {
  const [count, Setcount] = useState(1);
  let userdetail = useContext(UserDetails);

  const AddToCart = async () => {
    if (userdetail.user.isactive != true) {
      return toast.error("Please login", {
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
    }
    await axios
      .post(
        "/api/addtocart",
        { Foodid: id, Quantity: count },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        return toast.success(res.data, {
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
      })

      .catch((err) => {
        console.log(err);
        return toast.error(err.response.data, {
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

  const Pluscount = () => {
    Setcount(count + 1);
  };
  const Minuscount = () => {
    if (count != 1) {
      Setcount(count - 1);
    }
  };
  return (
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
      <div
        key={id}
        className="cursor-pointer shadow-2xl bg-gray-50 sm:min-h-9/12 sm:max-h-9/12 min-w-72 max-w-72 flex flex-col justify-center  p-5 m-5 rounded-2xl hover:-translate-y-3 hover:transition-all"
      >
        <img
          className="rounded-2xl min-h-40 max-h-40 sm:min-h-52 sm:max-h-52 sm:w-60"
          src={img}
          alt={alt}
        />
        <h2 className="text-center my-3 font-bold">
          {name} - {price} ₨
        </h2>
        {/* <p className="text-center my-3">{price} ₨</p>*/}
        <span className="flex items-center justify-center">
          <button
            onClick={Minuscount}
            className="bg-white  p-1 rounded h-auto w-auto cursor-pointer "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M200-440v-80h560v80H200Z" />
            </svg>
          </button>
          <p className="m-2">{count}</p>
          <button
            onClick={Pluscount}
            className="bg-white  p-1 rounded h-auto w-auto cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button>
        </span>
        <button
          onClick={AddToCart}
          className="w-full mt-5 bg-black text-white p-2 rounded cursor-pointer shadow"
        >
          🛒 cart
        </button>
      </div>
    </>
  );
};

export { Card };
