/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";

const CourseModal = ({ onAddCourse, onClose, theme }) => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseCode: "",
    grade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleAddCourse = () => {
    if (courseData.courseName && courseData.courseCode && courseData.grade) {
      onAddCourse(courseData);
      setCourseData({ courseName: "", courseCode: "", grade: "" });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`${
          theme === "dark" ? "bg-black text-white" : "bg-white text-gray-800"
        } p-8 rounded-lg shadow-lg max-w-md w-full`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add Course</h2>
        <div className="mb-4">
          <label htmlFor="courseName" className="block mb-2">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
            className={`w-full border ${
              theme === "dark" ? "border-gray-600" : "border-gray-400"
            } p-2 rounded-md`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="courseCode" className="block mb-2">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={courseData.courseCode}
            onChange={handleChange}
            className={`w-full border ${
              theme === "dark" ? "border-gray-600" : "border-gray-400"
            } p-2 rounded-md`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="grade" className="block mb-2">
            Grade
          </label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={courseData.grade}
            onChange={handleChange}
            className={`w-full border ${
              theme === "dark" ? "border-gray-600" : "border-gray-400"
            } p-2 rounded-md`}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAddCourse}
            className={`${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 px-4 rounded mr-2`}
          >
            Add Course
          </button>
          <button
            onClick={onClose}
            className={`${
              theme === "dark"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            } text-white font-bold py-2 px-4 rounded`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

CourseModal.propTypes = {
  onAddCourse: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default CourseModal;
