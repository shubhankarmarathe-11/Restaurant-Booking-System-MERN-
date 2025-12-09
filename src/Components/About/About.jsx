import Details from "./Details.json";
import BgImg from "../../assets/BackgroundImg.png";

const ServicesCard = ({ data }) => {
  return (
    <>
      <span
        className="bg-white rounded-2xl cursor-pointer shadow m-5 flex flex-col items-center p-3 flex-wrap"
        key={data.id}
      >
        <img className="w-32 h-32 rounded m-2" src={data.img} />
        <h2 className="my-1 font-bold">{data.name}</h2>
        <p className="text-center my-1">{data.description}</p>
      </span>
    </>
  );
};

const About = () => {
  return (
    <>
      <h2 className="text-3xl text-center my-5">{Details.about.title}</h2>
      <div
        className="bg-cover bg-center h-auto w-auto m-1 sm:m-5 rounded-2xl "
        style={{ backgroundImage: `url(${BgImg})` }}
      >
        <span className="text-white flex flex-col items-center">
          <p className="my-6 mx-5 sm:w-5xl text-center  font-bold text-xl">
            {Details.about.description}
          </p>
          <span>
            {Details.about.highlights.map((u) => {
              return <p className="text-center my-4 font-bold">{u}</p>;
            })}
          </span>
        </span>
      </div>
      <h2 className="my-3 text-center text-2xl">Restaurant Services</h2>
      <span className="flex flex-col justify-center items-center sm:flex-row">
        {Details.services.map((data) => {
          return <ServicesCard data={data} />;
        })}
      </span>
    </>
  );
};

export { About };
