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
import { Fooditems } from "./Context/FooditemContext";

function App() {
  const [user, Setuser] = useState({});
  const [fooditems, SetFooditems] = useState({});

  return (
    <>
      <UserDetails.Provider value={{ user, Setuser }}>
        <Fooditems.Provider value={{ fooditems, SetFooditems }}>
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
                    <BookTable />
                  </div>
                </>
              }
            />
            <Route
              path="/buyfood"
              element={
                <>
                  <div className="min-h-screen flex flex-col">
                    <MenuCard />
                  </div>
                </>
              }
            />

            <Route
              path="/cart"
              element={
                <>
                  <div className="min-h-screen flex flex-col">
                    <Cart />
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
                    <DashBoard />
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
        </Fooditems.Provider>
      </UserDetails.Provider>
    </>
  );
}

export default App;
