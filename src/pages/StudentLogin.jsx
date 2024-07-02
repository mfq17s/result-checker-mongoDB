/* eslint-disable no-unused-vars */
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../App";
import toast from "react-hot-toast";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const StudentLogin = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleCredentials = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const checkResult = async (indexNumber, password) => {
    try {
      // Query the database to find the student with the provided index number
      const studentRef = collection(db, "student");
      const q = query(studentRef, where("indexNumber", "==", indexNumber));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        // No student found with the provided index number
        console.log("No students found");
        toast.error("Invalid index number");
        return;
      }
  
      // Get the first (and only) document from the query snapshot
      const studentDoc = querySnapshot.docs[0];
      const studentData = studentDoc.data();
  
      // Check if the provided password matches the stored password
      if (studentData.password === password) {
        // Query the "results" collection for the student's results
        const resultsRef = collection(db, "results");
        const resultsQuery = query(
          resultsRef,
          where("indexNumber", "==", indexNumber)
        );
        const resultsSnapshot = await getDocs(resultsQuery);
  
        if (resultsSnapshot.empty) {
          // No results found for the student
          console.log("No results found");
          toast.error("No results found");
          return;
        }
  
        // Retrieve the results data
        const resultsData = resultsSnapshot.docs.map((doc) => doc.data());
  
        // Navigate to StudentResults and pass the student's details and results as state
        navigate("/StudentResults", {
          state: { ...studentData, results: resultsData },
        });
      } else {
        // Invalid password
        toast.error("Invalid password");
      }
    } catch (error) {
      console.error("Error fetching student data: ", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center min-h-screen w-100% darkmode`}
    >
      <div className="p-8 border rounded-lg shadow-xl dark:shadow-white dark:shadow-inner w-full max-w-md bg-white sm:scale-100 scale-75 darkmode">
        <form className="form">
          <div className="form-header mb-6">
            <h1 className="text-2xl text-center font-bold">Student Login</h1>
          </div>
          <div className="form-body mb-6">
            <div className="mb-4">
              <div className="flex items-center border border-gray-400 rounded-md px-3 py-2">
                <FaUser className="mr-2" />
                <input
                  onChange={(e) => {
                    handleCredentials(e);
                  }}
                  type="text"
                  placeholder="indexNumber"
                  required
                  className="outline-none flex-grow placeholder-black darkmode dark:placeholder-white p-1"
                  id="indexNumber"
                  name="indexNumber"
                  autoComplete="email"
                />
              </div>

              <div className="flex items-center mt-6 border border-gray-400 rounded-md px-3 py-2">
                <FaLock className="mr-2" />
                <input
                  onChange={(e) => {
                    handleCredentials(e);
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="outline-none flex-grow placeholder-black darkmode dark:placeholder-white p-1"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div></div>
          </div>
          <button
            onClick={checkResult}
            type="button"
            className="buttonStyle"
          >
            Check Result
          </button>
          <span className="flex items-center justify-center gap-3 pt-8">
            Are You An Admin?{" "}
            <Link to="/Login" className="text-sm text-blue-800">
              Click Here!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
