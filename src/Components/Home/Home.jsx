import { HomePageMenu } from "../ReUsable/HomePageMenu";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../ReUsable/Navbar";
import { Footer } from "../ReUsable/Footer";
import { useState, useEffect, useContext } from "react";
import { UserDetails } from "../../Context/LoginContext";
import { Fooditems } from "../../Context/FooditemContext";
import axios from "axios";
import Loader from "../ReUsable/Loader";

const Home = () => {
  let navigate = useNavigate();

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
        fooditems.SetFooditems(res.data);
        setTimeout(() => {
          Setloading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        Setloading(true);
        GetFooItem();
      });
  };

  useEffect(() => {
    if (!userdetail.user.isactive || userdetail.user.isactive == undefined) {
      GetInfo();
    }
  }, []);
  useEffect(() => {
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
          <div className="overflow-y-auto h-auto my-5 py-3 flex flex-col items-center justify-center">
            <p className="text-center text-5xl w-96 sm:w-fit my-8 sm:text-7xl">
              Welcome to DemoRestaurant
            </p>
            <p className="text-center w-96 my-5">
              delicious food delivered to your door, and easy table booking for
              your perfect dine-in experience.
            </p>
            <span>
              <button
                onClick={() => navigate("/buyfood")}
                className="bg-black text-white m-3 p-3 rounded cursor-pointer shadow"
              >
                Food Items &#8702;
              </button>
              <button
                onClick={() => navigate("/booktable")}
                className="m-3 p-3 rounded hover:bg-black hover:text-white hover:transition delay-75 cursor-pointer shadow"
              >
                Book Table &#8702;
              </button>
            </span>
          </div>
          <div>
            <h2 className="text-center text-3xl my-2 ">Add to cart</h2>
            <li className="font-bold sm:text-2xl mx-2">🍛 Indian Food</li>
            <HomePageMenu data={fooditems.fooditems.indianFood} />
            <li className="font-bold sm:text-2xl mx-2">🍕 Fast Food</li>
            <HomePageMenu data={fooditems.fooditems.fastFood} />
            <li className="font-bold sm:text-2xl mx-2">🍰 Desserts</li>
            <HomePageMenu data={fooditems.fooditems.desserts} />
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export { Home };

{
  /*
   */
}
