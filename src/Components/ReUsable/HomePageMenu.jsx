import { Link } from "react-router-dom";
import { Card } from "../ReUsable/Card";

const HomePageMenu = ({ data }) => {
  if (data == undefined) return null;
  return (
    <>
      <span className="flex flex-col flex-nowrap sm:justify-center">
        {data.length > 5 ? (
          <>
            <span className="flex flex-row flex-nowrap sm:flex-wrap overflow-x-auto items-center sm:justify-center">
              {data.slice(0, 5).map(({ _id, FoodName, ImageUrl, Price }) => {
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
            <Link
              className="underline text-violet-800 min-w-fit mx-2 text-center"
              to={"/buyfood"}
            >
              View More
            </Link>
          </>
        ) : (
          <>
            <span className="flex flex-row flex-nowrap sm:flex-wrap overflow-x-auto items-center sm:justify-center">
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
          </>
        )}
      </span>
    </>
  );
};

export { HomePageMenu };
