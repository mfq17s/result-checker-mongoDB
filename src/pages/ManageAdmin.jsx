/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../App";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import UpdateUserModal from "../components/UpdateUserModal";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function ManageAdmin() {
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleUpdate = async (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (!userId) {
      toast.error("Invalid user ID");
      return;
    }

    try {
      // Delete user from Firestore
      await deleteDoc(doc(db, "admin", userId));
      toast.success("User deleted successfully");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      toast.error("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateConfirm = async (updatedUser) => {
    try {
      const userRef = doc(db, "admin", updatedUser.uid);
      await updateDoc(userRef, {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      });
      toast.success("User updated successfully");
      fetchUsers();
      setShowModal(false);
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  const fetchUsers = async () => {
    const usersCollection = collection(db, "admin");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center min-h-screen w-100% darkmode`}
    >
      {showModal && (
        <UpdateUserModal
          user={editUser}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdateConfirm}
        />
      )}
      {users.length > 0 ? (
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-xl dark:shadow-white darkmode">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">All Admins</h3>
            <Link to="/Admins">
              <button className="buttonStyle px-2">
                Add Admin
              </button>
            </Link>
          </div>
          <table className="w-full darkmode">
            <thead>
              <tr>
                <th className="font-bold">Email</th>
                <th className="font-bold">First Name</th>
                <th className="font-bold">Last Name</th>
                <th className="font-bold">Update</th>
                <th className="font-bold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <button
                      className="buttonStyle p-2"
                      onClick={() => handleUpdate(user)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="buttonStyle p-2"
                      onClick={() => handleDelete(user.uid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ManageAdmin;
