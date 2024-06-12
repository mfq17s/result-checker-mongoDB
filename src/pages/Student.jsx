import { ThemeContext } from "../App";
import { useContext } from "react";

const Student = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      }flex justify-center items-center w-[100vw] darkmode sm:scale-100 scale-75`}
    >
      <div className=" h-[100vh] ">
        <h1 className="text-2xl font-bold mb-4">Student List</h1>
        <table className="w-sc table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Index Number</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Registration Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">John Doe</td>
              <td className="border px-4 py-2">123456</td>
              <td className="border px-4 py-2">Computer Science</td>
              <td className="border px-4 py-2">2022-01-01</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
