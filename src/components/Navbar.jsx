/* eslint-disable react/prop-types */
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { items } from "../assets/data";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../App";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const location = useLocation();
  let dontShowList =
    location.pathname === "/Login" ||
    location.pathname === "/StudentLogin" ||
    location.pathname === "/StudentResults" ||
    location.pathname === "/";

  return (
    <nav
      className={`fixed z-50 py-3 w-[100%] ${
        theme === "dark" ? "dark:bg-black" : "bg-white"
      } backdrop-blur-lg border-b border-neutral-700/80 top-0`}
    >
      <div className="container px-4 mx-auto text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center  flex-shrink-0">
            <Link to="/Home">
              <img className="h-7 w-7 mr-3" src={logo} alt="logo" />
            </Link>

            <span className="text-xt bg-gradient-to-r from-color-oranges to to-color-blues text-transparent bg-clip-text tracking-tight justify-start">
              <Link to="/Home">ADMIN DASHBOARD </Link>
              <Link className="text-[#FCB040]" to="/Home">
                |
              </Link>
            </span>
          </div>

          <div className="hidden lg:flex  space-x-12 items-center">
            {!dontShowList && (
              <ul className="flex dark:text-white  space-x-3 text-xs ">
                {items.map((item, index) => (
                  <li key={index} className="hoverStyle">
                    <Link to={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-x-6 flex items-center">
            <ThemeButton theme={theme} toggleTheme={toggleTheme} />
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md dark:text-white  focus:outline-none"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          {isOpen && (
            <div className="lg:hidden">
              <ul className="flex flex-col dark:text-white items-center mt-4 space-y-4">
                {items.map((item, index) => (
                  <li key={index} className="hoverStyle">
                    <Link to={item.href} onClick={toggleMenu}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="hoverStyle">
                  <Link to="/" onClick={toggleMenu}
                  className="logoutLink px-5 py-2">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
