/* eslint-disable no-unused-vars */
import React from "react";
import { ThemeContext } from "../App";
import { useContext } from "react";

function ManageAdmin() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center min-h-screen w-100% darkmode`}
    >
      
    </div>
  );
}

export default ManageAdmin;
