/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ThemeContext } from "../App";
export default function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex bottom-0 w-screen bg-[#F7F7F7] text-xs p-9 justify-center darkmode`}
    >
      &copy; 2024 Radford University College
    </footer>
  );
}
