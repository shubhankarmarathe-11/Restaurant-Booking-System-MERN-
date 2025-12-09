import FoodItem from "../../../fooditemdatainjson.json";
import { Card } from "../ReUsable/Card";
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
  return (
    <>
      <div className="text-4xl text-center my-5 font-bold">🧾 Menu Card</div>
      <li className="font-bold sm:text-2xl mx-2  text-center">
        🍛 Indian Food
      </li>
      <MenuDiv data={FoodItem.indianFood} />
      <li className="font-bold sm:text-2xl mx-2  text-center">🍕 Fast Food</li>
      <MenuDiv data={FoodItem.fastFood} />
      <li className="font-bold sm:text-2xl mx-2  text-center">🍰 Desserts</li>
      <MenuDiv data={FoodItem.desserts} />
    </>
  );
};

export { MenuCard };
