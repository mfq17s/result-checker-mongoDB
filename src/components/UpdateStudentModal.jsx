/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UpdateStudentModal = ({ onSubmit, onClose, theme, student }) => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    faculty: "",
    emailAddress: "",
    indexNumber: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        faculty: student.faculty,
        emailAddress: student.emailAddress,
        indexNumber: student.indexNumber,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } fixed z-10 inset-0 overflow-y-auto darkmode`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg darkmode p-6">
          <h2 className="text-xl darkmode font-bold mb-4">Update Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 darkmode">
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
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
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md w-full darkmode"
              />
            </div>
            <div className="mb-4 darkmode">
              <label htmlFor="faculty" className="block mb-2">
                Faculty
              </label>
              <input
                type="text"
                id="faculty"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md w-full darkmode"
              />
            </div>
            <div className="mb-4 darkmode">
              <label htmlFor="emailAddress" className="block mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md w-full darkmode"
              />
            </div>
            <div className="mb-4 darkmode">
              <label htmlFor="indexNumber" className="block mb-2">
                Index Number
              </label>
              <input
                type="text"
                id="indexNumber"
                name="indexNumber"
                value={formData.indexNumber}
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md w-full darkmode"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UpdateStudentModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  student: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    faculty: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    indexNumber: PropTypes.string.isRequired,
  }),
};

export default UpdateStudentModal;
