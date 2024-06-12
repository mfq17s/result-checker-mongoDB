/* eslint-disable no-unused-vars */
import { FaUser, FaLock } from "react-icons/fa";
import react, { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../App";

const StudentLogin = () => {
  const { theme } = useContext(ThemeContext);
  const [indexNumber, setIndexNumber] = useState("");
  const [password, setPassword] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const handleIndexNumberChange = (e) => {
    setIndexNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (

    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center pt-16 items-center min-h-screen darkmode`}
    >
      <div className="p-8 border rounded-lg shadow-xl w-2/3 max-w-md sm:scale-100 scale-75 darkmode">
        <div className="form text-xs">
          <div className="form-header mb-6">
            <h1 className="text-sm text-center font-bold">Student Result</h1>
          </div>
          <form onSubmit={handleSubmit} className="form-body mb-6">
            <div className="mb-4">
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaUser className="mr-2" />
                <input
                  type="text"
                  placeholder="Index number"
                  value={indexNumber}
                  onChange={handleIndexNumberChange}
                  className="outline-none flex-grow placeholder-black darkmode dark:placeholder-white"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaLock className="mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="outline-none flex-grow placeholder-black darkmode dark:placeholder-white"
                />
              </div>
            </div>
          </form>
          <div className="form-footer">
            <select
              value={semester}
              onChange={handleSemesterChange}
              className="mb-4 w-full border rounded-md px-3 py-2 darkmode "
            >
              <option value="">Select semester</option>
              <option value="sem1">Semester 1</option>
              <option value="sem2">Semester 2</option>
              <option value="all">All Semesters</option>
            </select>
            <select
              value={department}
              onChange={handleDepartmentChange}
              className="mb-4 w-full border rounded-md px-3 py-2 darkmode"
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
            <select
              value={year}
              onChange={handleYearChange}
              className="mb-4 w-full border rounded-md px-3 py-2 darkmode"
            >
              <option value="">Select Year</option>
              <option value="year1">Year 1</option>
              <option value="year2">Year 2</option>
              <option value="year3">Year 3</option>
              <option value="year4">Year 4</option>
              <option value="all">All Years</option>
            </select>
            <button
              type="submit"
              className="buttonStyle"
            >
              CHECK RESULTS
            </button>
          </div>
        </div>
        <span className="flex items-center justify-center gap-3 p-5 text-xs">
          Are you an Admin?{" "}
          <a href="/Login" className="text-sm text-blue-800">
            Click Here!
          </a>
        </span>
        <div className="mt-4 flex justify-between text-sm">
          <div className="one flex items-center">
            <input type="checkbox" id="studentcheckbox" className="mr-2" />

            <label htmlFor="studentcheckbox" className="text-xs">
              Remember Me
            </label>
          </div>
          <div className="two">
            <label>
              <a href="#" className="text-xs">
                Terms & conditions
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
