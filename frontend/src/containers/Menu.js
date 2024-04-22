import React from "react";
import { Link, Outlet } from "react-router-dom";

const Menu = () => {

  const isActive = (path) => {
    return "text-yellow-500";
  };

  return (
    <div>
      <ul className="flex bg-primary">
        <li className="nav-item">
          <Link className={`nav-link px-4 py-2 ${isActive("/")}`} to="/">
            Home
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Menu;
