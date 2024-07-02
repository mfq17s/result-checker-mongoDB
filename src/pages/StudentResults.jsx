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
      <div className="pt-15 pb-16 flex flex-col items-center darkmode w-100%">
        <div ref={componentRef} className="w-full  lg:p-9 md:p-10">
          <h1 className="sr-only">Result Page</h1>

          <div>
  <h2 className="text-xl font-bold mb-4">Student Details</h2>
  <p className="py-2">
    <span className="font-bold ">Index Number:</span> {studentData.indexNumber}
  </p>
  <p className="py-2">
    <span className="font-bold">First Name:</span> {studentData.firstName}
  </p>
  <p className="py-2">
    <span className="font-bold">Last Name:</span> {studentData.lastName}
  </p>
  <p className="py-2">
    <span className="font-bold">Email:</span> {studentData.emailAddress}
  </p>
  <p className="py-2">
    <span className="font-bold">Phone Number:</span> {studentData.phoneNumber}
  </p>
</div>


          {/* Display results if available */}
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.id}>
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
