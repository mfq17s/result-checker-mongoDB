import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../App";

function StudentResults() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const results = location.state?.results || [];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } sm:scale-100 scale-75 h-[100vh] darkmode`}
    >
      <div className="pt-15 pb-16 flex flex-col items-center justify-center darkmode">
        <div ref={componentRef} className="w-4/6 shadow- px-4 py-6">
          <h1 className="sr-only">Result Page</h1>
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.id}>
                <p>
                  <span className="font-bold">Index Number:</span>{" "}
                  {result.indexNumber}
                </p>
                <p>
                  <span className="font-bold">Department:</span>{" "}
                  {result.department}
                </p>
                <p>
                  <span className="font-bold">Year:</span> {result.year}
                </p>
                <p>
                  <span className="font-bold">Semester:</span> {result.semester}
                </p>

                <table className="table-auto text-xs w-full mt-4">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Course Name</th>
                      <th>Course Code</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.courses.map((course, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{course.courseName}</td>
                        <td>{course.courseCode}</td>
                        <td>{course.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="">
                        Total Marks:
                      </td>
                      <td>{result.totalMarks}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="">
                        Percentage:
                      </td>
                      <td>{result.percentage}%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
        <button
          onClick={handlePrint}
          className="buttonStyle width: 25%; flex items-center justify-between"
        >
          Print Result <FaPrint />
        </button>
      </div>
    </div>
  );
}

export default StudentResults;
