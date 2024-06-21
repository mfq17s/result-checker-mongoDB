/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { Toaster } from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Admins() {
  const { theme } = useContext(ThemeContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.promise(
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = auth.currentUser;
          console.log(user);
          if (user) {
            await setDoc(doc(db, "admin", user.uid), {
              email: user.email,
              uid: user.uid,
              role: "admin",
              firstName,
              lastName,
            });
          }
          navigate("/ManageAdmin");
          return "Admin added successfully";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          return errorMessage;
        }),
      {
        loading: "Adding admin...",
        success: (message) => message,
        error: (error) => error,
      }
    );
  };

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center min-h-screen w-100% darkmode`}
    >
      <div className="bg-white text-gray-800 p-6 dark:shadow-white dark:shadow-inner shadow-xl rounded-lg w-4/5 max-w-md sm:scale-100 darkmode scale-75">
        <h1 className="text-xl font-bold mb-4 text-center">Add Admin</h1>
        <form onSubmit={handleAddAdmin}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-2">
              FirstName
            </label>
            <input
              name="text"
              type="firstName"
              id="firstName"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-2">
              LastName
            </label>
            <input
              name="lastName"
              type="text"
              id="lastName"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              required
            />
          </div>
          <button type="submit" className="buttonStyle">
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
}
export default Admins;
