import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  return (

<div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center min-h-screen w-100% darkmode`}
    >

      <div className="p-8 border rounded-lg shadow-xl w-full max-w-md bg-white sm:scale-100 scale-75 darkmode">
        <form className="form">
          <div className="form-header mb-6">
            <h1 className="text-2xl text-center font-bold">Admin Login</h1>
          </div>

          <div className="form-body mb-6">
            <div className="mb-4">
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-200">
                <FaUser className="mr-2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="bg-gray-200 text-gray-800 outline-none flex-grow placeholder-gray-500"
                  id="email"
                  name="email"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-200">
                <FaLock className="mr-2 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="bg-gray-200 text-gray-800 outline-none flex-grow placeholder-gray-500"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="buttonStyle"
          >
            Sign in
          </button>
          <span className="flex items-center justify-center gap-3 pt-8">
            Check results?{" "}
            <Link to="/StudentLogin" className="text-sm text-blue-800">
              Click Here!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
