import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../App";


function StudentResults() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const studentData = location.state || {};
  const allResults = location.state?.results || [];
  const indexNumber = location.state?.indexNumber || "";

  const results = indexNumber
    ? allResults.filter((result) => result.indexNumber === indexNumber)
    : allResults;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } sm:scale-100 scale-75 h-[100vh] w-[95vw] darkmode`}
    >
      <div className="pt-15 pb-16 flex flex-col items-center darkmode w-100% ">
        <div ref={componentRef} className="w-full  lg:p-9 md:p-10 ">
          <h1 className="sr-only">Result Page</h1>

          <div>
            <h2 className="text-xl font-bold mb-4">Student Details</h2>
            <p className="py-2">
              <span className="font-bold ">Index Number:</span>{" "}
              {studentData.indexNumber}
            </p>
            <p className="py-2">
              <span className="font-bold">First Name:</span>{" "}
              {studentData.firstName}
            </p>
            <p className="py-2">
              <span className="font-bold">Last Name:</span>{" "}
              {studentData.lastName}
            </p>
            <p className="py-2">
              <span className="font-bold">Email:</span>{" "}
              {studentData.emailAddress}
            </p>
            <p className="py-2">
              <span className="font-bold">Phone Number:</span>{" "}
              {studentData.phoneNumber}
            </p>
          </div>

          {/* Display results if available */}
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="mt-10">
                <p>
                  <span className="font-bold ">Academic Year:</span>{" "}
                  {result.academicYear}
                </p>
                <p>
                  <span className="font-bold">Department:</span>{" "}
                  {result.departmentId}
                </p>

                <table className="table-auto text-xs w-full my-9">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Course Name</th>
                      <th>Course Code</th>
                      <th>Grade</th>
                      <th>Year</th>
                      <th>Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.courses.map((course, courseIndex) => (
                      <tr key={`${index}-${courseIndex}`}>
                        <td>{courseIndex + 1}</td>
                        <td>{course.courseName}</td>
                        <td>{course.courseId}</td>
                        <td>{course.grade}</td>
                        <td>{result.year}</td>
                        <td>{result.semester}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-3xl p-5">No results found.</p>
          )}
        </div>
        <div className=" w-1/2 flex justify-center items-center py-2">
          <button
            onClick={handlePrint}
            className="buttonStyle w-3/5 flex justify-center items-center gap-5"
          >
            Print Result <FaPrint />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentResults;
