import { HomePageMenu } from "../ReUsable/HomePageMenu";
import FoodItem from "../../../fooditemdatainjson.json";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="overflow-y-auto h-auto my-5 py-3 flex flex-col items-center justify-center">
        <p className="text-center text-5xl w-96 sm:w-fit my-8 sm:text-7xl">
          Welcome to DemoRestaurant
        </p>
        <p className="text-center w-96 my-5">
          delicious food delivered to your door, and easy table booking for your
          perfect dine-in experience.
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
        <HomePageMenu data={FoodItem.indianFood} />
        <li className="font-bold sm:text-2xl mx-2">🍕 Fast Food</li>
        <HomePageMenu data={FoodItem.fastFood} />
        <li className="font-bold sm:text-2xl mx-2">🍰 Desserts</li>
        <HomePageMenu data={FoodItem.desserts} />
      </div>
    </>
  );
};

export { Home };
