/* eslint-disable no-unused-vars */
import { React } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCar, FaCog, FaBackward } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import "../Style.css";
import { theme } from "../../Stores/theme";
import { BsCode } from "react-icons/bs";

// want to start here? it will be ez for me to create whole page fast wait no
// take me to nav container where width is set

function VehicleNav() {
  const location = useLocation();
  const menuItems = [
    {
      name: "Electrical",
      icon: <GiElectric />,
      path: "/vehicle/electrical",
    },
    {
      name: "Engine",
      icon: <FaCog />,
      path: "/vehicle/engine",
    },
    {
      name: "Dashboard",
      icon: <FaCar />,
      path: "/vehicle/dashboard",
    },
    {
      name: "CCF",
      icon: <FaCog />,
      path: "/vehicle/ccf",
    },
    {
      name: "Detailed",
      icon: <FaCog />,
      path: "/vehicle/detail",
    },
  ];
  const primaryColor = theme((state) => state.primaryColor);
  const primaryColorSet = "from-" + primaryColor + "-400";
  const secondaryColor = theme((state) => state.secondaryColor);
  const secondaryColorSet = "to-" + secondaryColor + "-600";
  return (
    <div className={`h-20 w-full shadow-lg`}>
      <div className="transition flex justify-center px-5 items-center">
        {menuItems.map((m) => {
          return (
            <Link
              to={m.path}
              className={
                location.pathname === m.path
                  ? `SINGLE-NAVBAR-ITEM justify-center items-center w-[20%] text-center bg-gradient-to-br ${primaryColorSet} ${secondaryColorSet} bg-opacity-50 text-4xl inline-flex text-white active:text-gray-100 p-3 m-2 rounded-lg active:bg-opacity-75 transition active:scale-95`
                  : "SINGLE-NAVBAR-ITEM justify-center items-center w-[20%] text-center bg-black bg-opacity-50 text-4xl inline-flex text-white active:text-gray-100 p-3 m-2 rounded-lg active:bg-opacity-75 transition active:scale-95"
              }
            >
              {m.icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default VehicleNav;
