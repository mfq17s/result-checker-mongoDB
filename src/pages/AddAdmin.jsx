import { useContext } from "react";
import { ThemeContext } from "../App";

const AddAdmin = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center min-h-screen w-100% darkmode`}
    >
      <div className="bg-white text-gray-800 p-6 dark:shadow-white dark:shadow-inner shadow-xl rounded-lg w-4/5 max-w-md sm:scale-100 darkmode scale-75">
        <h1 className="text-xl font-bold mb-4 text-center">Add Admin</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              required
            />
          </div>
          <button type="submit" className="buttonStyle">
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
