import { useContext } from "react";
import { ThemeContext } from "../App";

const ChangePassword = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center min-h-screen w-100% darkmode `}
    >
      <div className="bg-white text-gray-800 p-6 border rounded-lg shadow-xl dark:shadow-white dark:shadow-inner w-4/5 max-w-md sm:scale-100 scale-75 darkmode">
        <h1 className="text-xl font-bold mb-4">Change Password</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
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
            />
          </div>
          <button
            type="submit"
            className="buttonStyle"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
