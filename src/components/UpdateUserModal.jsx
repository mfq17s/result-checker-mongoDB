/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../App";

const UpdateUserModal = ({ user, onClose, onUpdate }) => {
  const { theme } = useContext(ThemeContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "admin", user.uid);
      const updatedData = {
        firstName,
        lastName,
      };

      if (email !== user.email) {
        updatedData.email = email;
      }

      if (password) {
        updatedData.password = password;
      }

      await updateDoc(userRef, updatedData);
      toast.success("User updated successfully");
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  UpdateUserModal.propTypes = {
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } fixed z-10 inset-0 overflow-y-auto darkmode `}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg darkmode p-6">
          <h2 className="text-xl darkmode font-bold mb-4">Update User</h2>
          <div className="mb-4 darkmode">
            <label htmlFor="firstName" className="block mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-400 p-2 rounded-md w-full darkmode"
            />
          </div>
          <div className="mb-4 darkmode">
            <label htmlFor="lastName" className="block mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-400 p-2 rounded-md w-full darkmode"
            />
          </div>
          <div className="mb-4 darkmode">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 p-2 rounded-md w-full darkmode"
            />
          </div>
          <div className="mb-4 darkmode">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 p-2 rounded-md w-full darkmode"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
