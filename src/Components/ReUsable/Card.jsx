import { useState } from "react";

const Card = ({ id, img, name, price, alt }) => {
  const [count, Setcount] = useState(1);

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
      <div
        key={id}
        className="cursor-pointer  bg-gray-100 border sm:min-h-9/12 sm:max-h-9/12 min-w-72 max-w-72 flex flex-col justify-center  p-5 m-5 rounded-2xl"
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
            ➖
          </button>
          <p className="m-2">{count}</p>
          <button
            onClick={Pluscount}
            className="bg-white  p-1 rounded h-auto w-auto cursor-pointer"
          >
            ➕
          </button>
        </span>
        <button className="w-full mt-5 bg-black text-white p-2 rounded cursor-pointer shadow">
          🛒 cart
        </button>
      </div>
    </>
  );
};

export { Card };
