/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { toast } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDepartmentId, setNewDepartmentId] = useState("");
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editedDepartmentName, setEditedDepartmentName] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      const departmentsCollection = collection(db, "departments");
      const departmentsSnapshot = await getDocs(departmentsCollection);
      const departmentsData = departmentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDepartments(departmentsData);
    };
  
    fetchDepartments(); // Fetch initial data
  
    const unsubscribe = onSnapshot(collection(db, "departments"), (snapshot) => {
      const updatedDepartments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDepartments(updatedDepartments);
    });
  
    return () => unsubscribe();
  }, []);
  

  const addDepartment = async () => {
    if (newDepartmentId.trim() !== "" && newDepartmentName.trim() !== "") {
      try {
        await addDoc(collection(db, "departments"), {
          id: newDepartmentId,
          name: newDepartmentName,
        });
        toast.success("Department added successfully!");
        setShowAddModal(false);
        setNewDepartmentId("");
        setNewDepartmentName("");
      } catch (error) {
        toast.error("Error adding department: " + error.message);
      }
    } else {
      toast.error("Please enter a department ID and name.");
    }
  };
  

  const deleteDepartment = async (id) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this department?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteDoc(doc(db, "departments", id));
              toast.success("Department deleted successfully!");
            } catch (error) {
              toast.error("Error deleting department: " + error.message);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };
  

  const startEditingDepartment = (department) => {
    setEditingDepartment(department);
    setEditedDepartmentName(department.name);
  };

  const updateDepartment = async () => {
    if (editedDepartmentName.trim() !== "") {
      try {
        await updateDoc(doc(db, "departments", editingDepartment.id), {
          name: editedDepartmentName,
        });
        toast.success("Department updated successfully!");
        setEditingDepartment(null);
        setEditedDepartmentName("");
      } catch (error) {
        toast.error("Error updating department: " + error.message);
      }
    } else {
      toast.error("Please enter a department name.");
    }
  };
  

  return (
    <div className="pt-28 w-[100vw] h-[100vh] sm:scale-100 darkmode scale-75 flex flex-col justify-center items-center">
      <h2 className="font-extrabold text-xl mb-9">Department Management</h2>
      <div>
      <button onClick={() => setShowAddModal(true)} className="buttonStyle px-3 py-2 mb-3">
        Add Department
      </button>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Department</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="departmentId"
                className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
              >
                Department ID
              </label>
              <input
                type="text"
                id="departmentId"
                value={newDepartmentId}
                onChange={(e) => setNewDepartmentId(e.target.value)}
                placeholder="Enter department ID"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="departmentName"
                className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
              >
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                placeholder="Enter department name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={addDepartment}
                className="buttonStyle px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-start justify-center">
      <table >
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>
                {editingDepartment?.id === department.id ? (
                  <input
                    type="text"
                    value={editedDepartmentName}
                    onChange={(e) => setEditedDepartmentName(e.target.value)}
                  />
                ) : (
                  department.name
                )}
              </td>
              <td>
                {editingDepartment?.id === department.id ? (
                  <>
                    <button
                      onClick={updateDepartment}
                      className="buttonStyle px-3 py-1 rounded-md darkmode"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingDepartment(null)}
                      className="buttonStyle px-3 py-1 rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditingDepartment(department)}
                      className="buttonStyle px-3 py-1 rounded-md darkmode"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDepartment(department.id)}
                      className="buttonStyle px-3 py-1 rounded-md darkmode"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Department;
