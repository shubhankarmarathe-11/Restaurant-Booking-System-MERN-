import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { UserDetails } from "../../Context/LoginContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, SetshowMenu] = useState(false);

  const userdetail = useContext(UserDetails);

  const onClickMenu = () => {
    SetshowMenu(!showMenu);
  };
  const onclickLogin = () => {
    SetshowMenu(!showMenu);
    navigate("/login");
  };

  return (
    <>
      <div className="my-2 flex flex-col sm:flex-row items-center justify-between p-2">
        <span className="flex flex-row items-center justify-between w-full sm:w-fit">
          <h3 className="text-2xl px-2 text-blue-400 cursor-pointer">
            DemoRestaurant
          </h3>
          <button
            onClick={onClickMenu}
            className="list-none text-2xl sm:hidden"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </span>
        <ul
          className={`
                  flex flex-col sm:flex-row items-center
                  sm:py-0 py-2
                  ${showMenu ? "block" : "hidden"}   /* mobile toggle */
                  sm:flex                      /* always visible on PC */
                `}
        >
          <li
            onClick={onClickMenu}
            className="py-2 sm:py-0 sm:px-2 cursor-pointer hover:text-blue-400"
          >
            <Link to={"/"}>Home</Link>
          </li>
          <li
            onClick={onClickMenu}
            className="py-2 sm:py-0 sm:px-2 cursor-pointer hover:text-blue-400"
          >
            <Link to={"/about"}>About</Link>
          </li>

          <li
            onClick={onClickMenu}
            className="py-2 sm:py-0 sm:px-2 cursor-pointer hover:text-blue-400"
          >
            <Link to={"/buyfood"}>Food Items</Link>
          </li>
          <li
            onClick={onClickMenu}
            className="py-2 sm:py-0 sm:px-2 cursor-pointer hover:text-blue-400"
          >
            <Link to={"/booktable"}>Book Table</Link>
          </li>
          <li
            onClick={onClickMenu}
            className="py-2 sm:py-0 sm:px-2 cursor-pointer hover:text-blue-400"
          >
            <Link to={"/cart"}>🛒 Cart</Link>
          </li>
          {/* check where the already logged in or not*/}
          <li className="py-2 sm:py-0 sm:px-2 ">
            {userdetail.user.isactive ? (
              <>
                <img
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="h-8 w-8 outline-blue-400 outline rounded-full shadow"
                  src={userdetail.user.pic}
                  alt="profileimg"
                />
              </>
            ) : (
              <>
                <button
                  onClick={onclickLogin}
                  className="bg-black text-white p-2 rounded cursor-pointer shadow"
                >
                  Login
                </button>
              </>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export { Navbar };
