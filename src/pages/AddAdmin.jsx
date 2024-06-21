import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "../App";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddAdmin = () => {
  const [userCredentials, setUserCredentials] = useState({});
  const { theme } = useContext(ThemeContext);

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  const isPasswordConfirmed = (password, confirmPassword) => {
    if (password && confirmPassword && password === confirmPassword)
      return true;
    return false;
  };

  function handleSignup(e) {
    e.preventDefault();
    if (
      !isPasswordConfirmed(
        userCredentials.password,
        userCredentials.confirmPassword
      )
    ) {
      toast.error("Passwords don't match");
      return;
    }

    toast.promise(
      createUserWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      ),
      {
        loading: "Creating admin account...",
        success: (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          return "Admin account created successfully!";
        },
        error: (error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          return errorMessage;
        },
      }
    );
  }

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
              onChange={(e) => {
                handleCredentials(e);
              }}
              name="email"
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
              onChange={(e) => {
                handleCredentials(e);
              }}
              name="password"
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
              onChange={(e) => {
                handleCredentials(e);
              }}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              required
            />
          </div>
          <button
            onClick={(e) => {
              handleSignup(e);
            }}
            type="submit"
            className="buttonStyle"
          >
            Add Admin
          </button>
        </form>
        <Link to="/ManageAdmin" className="mt-4 ">
          <button className="buttonStyle my-4">Manage Admin</button>
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default AddAdmin;
