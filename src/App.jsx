import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Auth/Login";
import { Signup } from "./Components/Auth/Signup";
import { Home } from "./Components/Home/Home";
import { MenuCard } from "./Components/MenuCard/MenuCard";
import { Navbar } from "./Components/ReUsable/Navbar";
import { NotFound } from "./Components/NotFound/NotFound";
import { Footer } from "./Components/ReUsable/Footer";
import { BookTable } from "./Components/BookTable/BookTable";
import { About } from "./Components/About/About";
import { Cart } from "./Components/CartComponent/Cart";
import { DashBoard } from "./Components/DashBoard/DashBoard";
import IsActive from "./Components/ReUsable/IsActive";

import { useState, useEffect, useContext } from "react";
import { UserDetails } from "./Context/LoginContext";

function App() {
  const [user, Setuser] = useState({});

  return (
    <>
      <UserDetails.Provider value={{ user, Setuser }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="min-h-screen flex flex-col">
                  <span className="flex-1">
                    <Home />
                  </span>
                </div>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <div className="min-h-screen flex flex-col">
                  <span className="flex-1">
                    <About />
                  </span>
                </div>
              </>
            }
          />
          <Route
            path="/booktable"
            element={
              <>
                <div className="min-h-screen flex flex-col">
                  <span className="flex-1">
                    <BookTable />
                  </span>
                </div>
              </>
            }
          />
          <Route
            path="/buyfood"
            element={
              <>
                <div className="min-h-screen flex flex-col">
                  <span className="flex-1">
                    <MenuCard />
                  </span>
                </div>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <div className="min-h-screen flex flex-col">
                  <span className="flex-1">
                    <Cart />
                  </span>
                </div>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Signup />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <div className="min-h-screen flex flex-col">
                  <span className="flex-1">
                    <DashBoard />
                  </span>
                </div>
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <NotFound />
              </>
            }
          />
        </Routes>
      </UserDetails.Provider>
    </>
  );
}

export default App;
