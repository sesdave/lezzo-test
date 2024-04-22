import React from "react";
import Menu from "./Menu";

const Layout = ({ title = "Title", description = "Description", className, children }) => (
  <div>
    <Menu />
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-4 text-lg text-gray-500">{description}</p>
        </div>
        <div className={`mt-10 ${className}`}>{children}</div>
      </div>
    </div>
  </div>
);

export default Layout;
