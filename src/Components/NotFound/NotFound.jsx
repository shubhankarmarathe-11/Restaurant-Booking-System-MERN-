import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-center text-2xl sm:text-6xl">Page Not Found</h2>
        <Link className="my-5 text-center text-violet-700" to={"/"}>
          Go to Home
        </Link>
      </div>
    </>
  );
};

export { NotFound };
