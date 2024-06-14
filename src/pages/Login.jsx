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

      <div className="p-8 border rounded-lg shadow-xl w-full max-w-md bg-white dark:shadow-white dark:shadow-inner sm:scale-100 scale-75 darkmode">
        <form className="form">
          <div className="form-header mb-6">
            <h1 className="text-2xl text-center font-bold">Admin Login</h1>
          </div>

          <div className="form-body mb-6">
            <div className="mb-4">
              

              <div className="flex items-center border border-gray-400 rounded-md px-3 py-2">
                <FaUser className="mr-2" />
                <input
                  type="text"
                  placeholder="Email"
                  required
                  className="outline-none flex-grow placeholder-black darkmode dark:placeholder-white p-1"
                  id="email"
                  name="email"
                  autoComplete="email"
                />
              </div>

              <div className="flex items-center mt-6 border border-gray-400 rounded-md px-3 py-2">
                <FaLock className="mr-2" />
                <input
                   type="password"
                  placeholder="Password"
                  required
                  className="outline-none flex-grow placeholder-black darkmode dark:placeholder-white p-1"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                />
              </div>

            </div>
            <div>
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
