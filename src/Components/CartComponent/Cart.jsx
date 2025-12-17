import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../../Context/LoginContext";
import { faTrashCan, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Loader from "../ReUsable/Loader";
import { Navbar } from "../ReUsable/Navbar";
import { Footer } from "../ReUsable/Footer";

const Cart = () => {
  const [TotalPrice, SetTotalPrice] = useState(0);

  const [loading, Setloading] = useState(true);
  const [refresh, Setrefresh] = useState(true);
  const userdetail = useContext(UserDetails);
  const navigate = useNavigate();

  const [CartItem, SetCartItem] = useState([]);

  const Pluscount = (id) => {
    const updated = CartItem.map((item) =>
      item.id === id ? { ...item, Quantity: item.Quantity + 1 } : item
    );

    SetCartItem(updated);
  };

  const Minuscount = async (id, quantity) => {
    if (quantity > 1) {
      const updated = CartItem.map((item) =>
        item.id === id ? { ...item, Quantity: item.Quantity - 1 } : item
      );

      return SetCartItem(updated);
    }

    // code to remove from cart
    console.log("w");
  };

  const toggleItem = (id) => {
    SetCartItem(
      CartItem.map((item) =>
        item._id === id ? { ...item, selected: !item.selected } : item
      )
    );
    SetTotalPrice(0);
    Setrefresh(!refresh);
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
        navigate("/login");
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

  const GetcartItems = async () => {
    await axios
      .get("/api/getcartitems", { withCredentials: true })
      .then((res) => {
        if (res.status == 201) {
          console.log(res.data.data);

          SetCartItem(res.data.data);
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
    if (!userdetail.user.isactive || userdetail.user.isactive == undefined) {
      GetInfo();
    } else {
      Setloading(false);
    }
  }, []);

  useEffect(() => {
    let arr = CartItem.filter((u) => u.selected == true);
    for (let i of arr) {
      SetTotalPrice(TotalPrice + i.Price);
    }
  }, [refresh]);

  useEffect(() => {
    GetcartItems();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="flex flex-col  items-center flex-1">
            <h2 className="text-2xl text-center">Cart Items</h2>
            <span className="h-auto flex flex-col items-center ">
              <h2 className="text-center rounded shadow-2xl m-5 p-2 w-fit ">
                Total Amount - {TotalPrice} Rs.
              </h2>
              <div className="flex flex-col sm:flex-row justify-center items-center w-full flex-wrap ">
                {CartItem.map((u) => {
                  return (
                    <div className="w-80 shadow rounded-2xl p-2 flex flex-col items-start bg-amber-200 my-2 sm:mx-2">
                      <span className="flex flex-row items-center justify-around w-full">
                        <input
                          type="checkbox"
                          className="m-2"
                          checked={u.selected}
                          onChange={() => {
                            toggleItem(u._id);
                          }}
                        />
                        <img
                          className="h-20 w-20 sm:h-20 sm:w-20 rounded"
                          src={u.ImageUrl}
                        />
                        <span className="flex flex-col justify-center">
                          <h2 className="">{u.FoodName}</h2>
                          <p className="text-center">{u.Price} Rs</p>
                          <span className="flex items-center justify-center my-2">
                            <button
                              onClick={() => {
                                Minuscount(u._id, u.Quantity);
                              }}
                              className="bg-white  p-1 rounded h-auto w-auto cursor-pointer "
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                            <p className="m-2">{u.Quantity}</p>
                            <button
                              onClick={() => {
                                Pluscount(u.id);
                              }}
                              className="bg-white  p-1 rounded h-auto w-auto cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faAdd} />
                            </button>
                          </span>
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-5 bg-black text-white p-2 rounded cursor-pointer shadow sm:w-fit">
                Order Now
              </button>
            </span>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export { Cart };
