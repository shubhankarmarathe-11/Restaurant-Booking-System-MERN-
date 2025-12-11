import FoodItem from "../../../fooditemdatainjson.json";
import { Card } from "../ReUsable/Card";
import { useState, useEffect, useContext } from "react";
import { UserDetails } from "../../Context/LoginContext";
import { Navbar } from "../ReUsable/Navbar";
import { Footer } from "../ReUsable/Footer";
import axios from "axios";
import Loader from "../ReUsable/Loader";

const MenuDiv = ({ data }) => {
  return (
    <>
      <span className="flex flex-col flex-nowrap sm:justify-center">
        <span className="flex flex-row flex-wrap overflow-x-auto items-center justify-center">
          {data.map(({ id, imgUrl, name, price, alt }) => {
            return (
              <Card id={id} img={imgUrl} name={name} price={price} alt={alt} />
            );
          })}
        </span>
      </span>
    </>
  );
};

const MenuCard = () => {
  const [loading, Setloading] = useState(true);
  const userdetail = useContext(UserDetails);

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
    if (!userdetail.user.isactive || userdetail.user.isactive == undefined) {
      GetInfo();
    } else {
      Setloading(false);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="text-4xl text-center my-5 font-bold">
            🧾 Menu Card
          </div>
          <li className="font-bold sm:text-2xl mx-2  text-center">
            🍛 Indian Food
          </li>
          <MenuDiv data={FoodItem.indianFood} />
          <li className="font-bold sm:text-2xl mx-2  text-center">
            🍕 Fast Food
          </li>
          <MenuDiv data={FoodItem.fastFood} />
          <li className="font-bold sm:text-2xl mx-2  text-center">
            🍰 Desserts
          </li>
          <MenuDiv data={FoodItem.desserts} />
          <Footer />
        </>
      )}
    </>
  );
};

export { MenuCard };
