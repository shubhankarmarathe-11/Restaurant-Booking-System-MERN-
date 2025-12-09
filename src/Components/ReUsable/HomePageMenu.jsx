import { Link } from "react-router-dom";
import { Card } from "../ReUsable/Card";
const HomePageMenu = ({ data }) => {
  return (
    <>
      <span className="flex flex-col flex-nowrap sm:justify-center">
        {data.length > 5 ? (
          <>
            <span className="flex flex-row flex-nowrap sm:flex-wrap overflow-x-auto items-center sm:justify-center">
              {data.slice(0, 5).map(({ id, imgUrl, name, price, alt }) => {
                return (
                  <Card
                    id={id}
                    img={imgUrl}
                    name={name}
                    price={price}
                    alt={alt}
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
              {data.map(({ id, imgUrl, name, price, alt }) => {
                return (
                  <Card
                    id={id}
                    img={imgUrl}
                    name={name}
                    price={price}
                    alt={alt}
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
