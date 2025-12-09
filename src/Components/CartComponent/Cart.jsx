import { useState } from "react";
import { faTrashCan, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
  const [TotalPrice, SetTotalPrice] = useState(0);
  const [CartItem, SetCartItem] = useState([
    {
      id: 1,
      name: "Butter Chicken",
      imgurl:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60",
      price: 500,
      quantity: 1,
      selected: false,
    },
    {
      id: 2,
      name: "Paneer Tikka",
      imgurl:
        "https://cdn.pixabay.com/photo/2018/12/04/16/49/tandoori-3856045_640.jpg",
      price: 600,
      quantity: 2,
      selected: false,
    },
  ]);

  const Pluscount = (id) => {
    const updated = CartItem.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    SetCartItem(updated);
  };

  const Minuscount = async (id, quantity) => {
    if (quantity > 1) {
      const updated = CartItem.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );

      return SetCartItem(updated);
    }

    // code to remove from cart
    console.log("w");
  };

  const toggleItem = (id) => {
    SetCartItem(
      CartItem.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  return (
    <>
      <div className="flex flex-col  items-center h-auto">
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
                        toggleItem(u.id);
                      }}
                    />
                    <img
                      className="h-20 w-20 sm:h-20 sm:w-20 rounded"
                      src={u.imgurl}
                    />
                    <span className="flex flex-col justify-center">
                      <h2 className="">{u.name}</h2>
                      <p className="text-center">{u.price} Rs</p>
                      <span className="flex items-center justify-center my-2">
                        <button
                          onClick={() => {
                            Minuscount(u.id, u.quantity);
                          }}
                          className="bg-white  p-1 rounded h-auto w-auto cursor-pointer "
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <p className="m-2">{u.quantity}</p>
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
    </>
  );
};

export { Cart };
