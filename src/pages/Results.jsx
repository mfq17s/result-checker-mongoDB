/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";
import ResultsTable from "../components/ResultsTable";
import SearchInput from "../components/SearchInput";

function Results() {
  const [results, setResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newResult, setNewResult] = useState({
    indexNumber: "",
    academicYear: "",
    departmentId: "",
    year: "",
    semester: "",
    courses: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchResults();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const coursesCollectionRef = collection(db, "Courses");
      const querySnapshot = await getDocs(coursesCollectionRef);
      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses data: ", error);
      toast.error("Error fetching courses data");
    }
  };

  const fetchResults = async () => {
    try {
      const resultsCollectionRef = collection(db, "results");
      const querySnapshot = await getDocs(resultsCollectionRef);
      const resultsData = querySnapshot.docs.map((doc) => doc.data());
      setResults(resultsData);
    } catch (error) {
      console.error("Error fetching results data: ", error);
      toast.error("Error fetching results data");
    }
  };

  const addResult = async (e) => {
    e.preventDefault();
    const toastLoadingId = toast.loading("Adding result!");

    try {
      const resultsCollectionRef = collection(db, "results");
      const querySnapshot = await getDocs(
        query(
          resultsCollectionRef,
          where("indexNumber", "==", newResult.indexNumber)
        )
      );

      const existingResults = querySnapshot.docs.map((doc) => doc.data());
      const existingCourseIds = existingResults.flatMap((result) =>
        result.courses.map((course) => course.courseId)
      );

      const duplicateCourseIds = newResult.courses
        .map((course) => course.courseId)
        .filter((courseId) => existingCourseIds.includes(courseId));

      if (duplicateCourseIds.length > 0) {
        const duplicateCourseNames = await Promise.all(
          duplicateCourseIds.map(async (courseId) => {
            const courseDocRef = doc(db, "Courses", courseId);
            const courseDocSnapshot = await getDoc(courseDocRef);
            return courseDocSnapshot.exists() ? courseDocSnapshot.id : courseId;
          })
        );

        toast.error(
          `Index number ${
            newResult.indexNumber
          } already has results declared for the following courses: ${duplicateCourseNames.join(
            ", "
          )}`,
          {
            id: toastLoadingId,
          }
        );
        return;
      }

      if (querySnapshot.empty) {
        // If no document exists for the given indexNumber, create a new one
        await addDoc(resultsCollectionRef, newResult);
        toast.success("Results data added successfully!", {
          id: toastLoadingId,
        });
      } else {
        // If a document exists for the given indexNumber, update it
        const existingDoc = querySnapshot.docs[0];
        const existingData = existingDoc.data();

        const updatedData = {
          ...existingData,
          courses: [...existingData.courses, ...newResult.courses],
        };

        await updateDoc(existingDoc.ref, updatedData);
        toast.success("Results data updated successfully!", {
          id: toastLoadingId,
        });
      }

      console.log("Results data added/updated successfully!");

      setNewResult({
        indexNumber: "",
        academicYear: "",
        departmentId: "",
        year: "",
        semester: "",
        courses: [],
      });
      fetchResults();
    } catch (error) {
      console.error("Error adding/updating results data: ", error);
      toast.error("Error adding/updating results data", {
        id: toastLoadingId,
      });
    }
  };

  const editResult = async (indexNumber, academicYear, updatedResult) => {
    try {
      const resultsCollectionRef = collection(db, "results");
      const documentId = `${indexNumber}_${academicYear}`;
      const documentRef = doc(resultsCollectionRef, documentId);

      await updateDoc(documentRef, updatedResult);
      console.log("Results data updated successfully!");
      toast.success("Results data updated successfully!");
      fetchResults();
    } catch (error) {
      console.error("Error updating results data: ", error);
      toast.error("Error updating results data");
    }
  };

  const handleInputChange = (e) => {
    setNewResult({ ...newResult, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...newResult.courses];
    if (field === "courseId") {
      const course = courses.find((c) => c.id === value);
      updatedCourses[index] = {
        courseId: value,
        courseName: course ? course.name : "",
        grade: updatedCourses[index].grade,
      };
    } else if (field === "courseName") {
      const course = courses.find((c) => c.name === value);
      updatedCourses[index] = {
        courseId: course ? course.id : "",
        courseName: value,
        grade: updatedCourses[index].grade,
      };
    } else {
      updatedCourses[index][field] = value;
    }
    setNewResult({ ...newResult, courses: updatedCourses });
  };

  const addCourse = () => {
    setNewResult({
      ...newResult,
      courses: [...newResult.courses, { courseId: "", grade: "" }],
    });
  };

  const removeCourse = (index) => {
    const updatedCourses = [...newResult.courses];
    updatedCourses.splice(index, 1);
    setNewResult({ ...newResult, courses: updatedCourses });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Index Number",
        accessor: "indexNumber",
      },
      {
        Header: "Academic Year",
        accessor: "academicYear",
      },
      {
        Header: "Department",
        accessor: "departmentId",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Semester",
        accessor: "semester",
      },
      {
        Header: "Courses",
        accessor: "courses",
        Cell: ({ value }) => (
          <ul>
            {value.map((course, index) => (
              <li key={index}>
                {course.courseId} - {course.grade}
              </li>
            ))}
          </ul>
        ),
      },
    ],
    []
  );
  console.log(results);
  return (
    <div className="flex w-[95vw] justify-center items-center flex-col  ">
      <div className="bg-white text-gray-800 p-6 border rounded-lg shadow-xl dark:shadow-white dark:shadow-inner w-[30rem] sm:scale-100 scale-75 lg:scale-[65%] darkmode">
        <h2 className="text-xl font-bold mb-4">Add New Result</h2>
        <form onSubmit={addResult} className="flex flex-col">
          <div className="mb-4">
            <label htmlFor="indexNumber" className="block mb-2">
              Index Number
            </label>
            <input
              type="text"
              id="indexNumber"
              name="indexNumber"
              placeholder="Index Number"
              value={newResult.indexNumber}
              onChange={handleInputChange}
              required
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="academicYear" className="block mb-2">
              Academic Year
            </label>
            <input
              type="text"
              id="academicYear"
              name="academicYear"
              placeholder="Academic Year"
              value={newResult.academicYear}
              onChange={handleInputChange}
              required
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="departmentId" className="block mb-2">
              Department ID
            </label>
            <input
              type="text"
              id="departmentId"
              name="departmentId"
              placeholder="Department ID"
              value={newResult.departmentId}
              onChange={handleInputChange}
              required
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block mb-2">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Year"
              value={newResult.year}
              onChange={handleInputChange}
              required
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="semester" className="block mb-2">
              Semester
            </label>
            <input
              type="number"
              id="semester"
              name="semester"
              placeholder="Semester"
              value={newResult.semester}
              onChange={handleInputChange}
              required
              className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 rounded-md"
            />
          </div>
          <h3 className="text-lg font-bold mb-2">Courses</h3>
          {newResult.courses.map((course, index) => (
            <div key={index} className="mb-4 flex flex-col ">
              <div className="mr-4">
                <label htmlFor={`courseId-${index}`} className="block my-5">
                  Course ID
                </label>
                <input
                  type="text"
                  id={`courseId-${index}`}
                  name="courseId"
                  placeholder="Course ID"
                  value={course.courseId}
                  onChange={(e) =>
                    handleCourseChange(index, "courseId", e.target.value)
                  }
                  required
                  className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 mb-5  rounded-md"
                />
              </div>

              <div>
                <label htmlFor={`grade-${index}`} className="block mb-2">
                  Grade
                </label>
                <input
                  type="text"
                  id={`grade-${index}`}
                  name="grade"
                  placeholder="Grade"
                  value={course.grade}
                  onChange={(e) =>
                    handleCourseChange(index, "grade", e.target.value)
                  }
                  required
                  className="bg-gray-200 text-gray-800 outline-none w-full px-3 py-2 mb-8 rounded-md"
                />
              </div>
              <button
                type="button"
                onClick={() => removeCourse(index)}
                className="buttonStyle"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mb-4">
            <button type="button" onClick={addCourse} className="buttonStyle">
              Add Course
            </button>
          </div>
          <button type="submit" className="buttonStyle">
            Add Result
          </button>
        </form>
      </div>

      <div className="mt-8 ">
        <div className="mb-4 scale-[80%]">
          <SearchInput value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className="scale-[80%]">
          <ResultsTable
            columns={columns}
            data={results}
            searchQuery={searchQuery}
            value="defaultValue"
          />
        </div>
      </div>
    </div>
  );
}

export default Results;
