/* eslint-disable no-unused-vars */
import react, { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Results = () => {
  const { theme } = useContext(ThemeContext);
  const [indexNumber, setIndexNumber] = useState("");
  const [password, setPassword] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const areFieldsFilled = () => {
    return indexNumber && password && semester && department && year;
  };

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center min-h-screen w-100% bg-white darkmode`}
    >
      <div className="bg-white text-gray-800 p-8 border rounded-lg shadow-xl dark:shadow-white dark:shadow-inner w-full max-w-md darkmode  scale-75">
        <h1 className="text-xl font-bold mb-4 text-center">Add Result</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="department" className="block mb-2">
              Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
            >
              <option value="">Select Department</option>
              <option value="ict">ICT</option>
              <option value="fashion">FASHION</option>
              <option value="medlab">MED LAB</option>
              <option value="graphics">GRAPHICS</option>
              <option value="accounting">ACCOUNTING</option>
              <option value="appliedscience">APPLIED SCIENCE</option>
              <option value="pa">PA</option>
              <option value="business">BUSINESS</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="semester" className="block mb-2">
              Semester
            </label>
            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
            >
              <option value="">Select semester</option>
              <option value="sem1">Semester 1</option>
              <option value="sem2">Semester 2</option>
              <option value="all">All Semesters</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block mb-2">
              Year
            </label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
            >
              <option value="">Select Year</option>
              <option value="year1">Year 1</option>
              <option value="year2">Year 2</option>
              <option value="year3">Year 3</option>
              <option value="year4">Year 4</option>
              <option value="all">All Years</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="indexNumber" className="block mb-2">
              Index Number
            </label>
            <input
              type="text"
              id="indexNumber"
              value={indexNumber}
              onChange={(e) => setIndexNumber(e.target.value)}
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              placeholder="Enter Index Number"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
              placeholder="Enter Password"
            />
          </div>
          <button
            type="submit"
            className="buttonStyle"
          >
            Add Result
          </button>
        </form>
      </div>
    </div>
  );
};

export default Results;
