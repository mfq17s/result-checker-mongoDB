import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../App";

const groupResultData = (results) => {
  const groupedData = {};
  results.forEach(result => {
    const yearKey = `Year ${result.year}`;
    const semesterKey = `Semester ${result.semester}`;
    if (!groupedData[yearKey]) {
      groupedData[yearKey] = { semesters: {} };
    }
    if (!groupedData[yearKey].semesters[semesterKey]) {
      groupedData[yearKey].semesters[semesterKey] = { courses: [] };
    }
    groupedData[yearKey].semesters[semesterKey].courses.push(...result.courses);
  });
  return groupedData;
};


function StudentResults() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const studentData = location.state || {};
  const allResults = location.state?.results || [];
  const indexNumber = location.state?.indexNumber || "";

  const results = indexNumber
    ? allResults.filter((result) => result.indexNumber === indexNumber)
    : allResults;

    const groupedResults = groupResultData(results);

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
          {Object.keys(groupedResults).length > 0 ? (
            Object.entries(groupedResults).map(([year, yearData]) => (
              <div key={year} className="mt-10">
                <h3 className="text-lg font-bold">{year}</h3>
                {Object.entries(yearData.semesters).map(([semester, semesterData]) => (
                  <div key={semester} className="mt-5">
                    <h4 className="text-md font-semibold">{semester}</h4>
                    <table className="table-auto text-xs w-full my-4">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Course Name</th>
                          <th>Course Code</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semesterData.courses.map((course, courseIndex) => (
                          <tr key={courseIndex}>
                            <td>{courseIndex + 1}</td>
                            <td>{course.name}</td>
                            <td>{course.courseId}</td>
                            <td>{course.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
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
