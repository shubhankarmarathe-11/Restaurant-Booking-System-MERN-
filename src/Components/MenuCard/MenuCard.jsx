import FoodItem from "../../../fooditemdatainjson.json";
import { Card } from "../ReUsable/Card";
import { useState, useEffect, useContext } from "react";
import { UserDetails } from "../../Context/LoginContext";
import { Fooditems } from "../../Context/FooditemContext";
import { Navbar } from "../ReUsable/Navbar";
import { Footer } from "../ReUsable/Footer";
import axios from "axios";
import Loader from "../ReUsable/Loader";

const MenuDiv = ({ data }) => {
  if (data == undefined) return null;
  return (
    <>
      <span className="flex flex-col flex-nowrap sm:justify-center">
        <span className="flex flex-row flex-wrap overflow-x-auto items-center justify-center">
          {data.map(({ _id, FoodName, ImageUrl, Price }) => {
            return (
              <Card
                id={_id}
                img={ImageUrl}
                name={FoodName}
                price={Price}
                alt={FoodName + " image"}
              />
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
  const fooditems = useContext(Fooditems);

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

  const GetFooItem = async () => {
    Setloading(true);
    axios
      .get("/api/getitems", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        fooditems.SetFooditems(res.data);
        setTimeout(() => {
          Setloading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        Setloading(true);
      });
  };

  useEffect(() => {
    if (!userdetail.user.isactive || userdetail.user.isactive == undefined) {
      GetInfo();
    }
  }, []);
  useEffect(() => {
    console.log();

    if (Object.keys(fooditems.fooditems).length === 0) {
      GetFooItem();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="flex-1">
            <div className="text-4xl text-center my-5 font-bold">
              🧾 Menu Card
            </div>
            <li className="font-bold sm:text-2xl mx-2  text-center">
              🍛 Indian Food
            </li>
            <MenuDiv data={fooditems.fooditems.indianFood} />
            <li className="font-bold sm:text-2xl mx-2  text-center">
              🍕 Fast Food
            </li>
            <MenuDiv data={fooditems.fooditems.fastFood} />
            <li className="font-bold sm:text-2xl mx-2  text-center">
              🍰 Desserts
            </li>
            <MenuDiv data={fooditems.fooditems.desserts} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export { MenuCard };
