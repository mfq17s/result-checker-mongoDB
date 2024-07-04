import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      const studentsCollection = collection(db, "student");
      const studentsSnapshot = await getDocs(studentsCollection);
      const totalStudents = studentsSnapshot.size;
      setTotalStudents(totalStudents);
    };

    const fetchTotalDepartments = async () => {
      const departmentsCollection = collection(db, "departments");
      const departmentsSnapshot = await getDocs(departmentsCollection);
      const totalDepartments = departmentsSnapshot.size;
      setTotalDepartments(totalDepartments);
    };

    const fetchTotalCourses = async () => {
      const coursesCollection = collection(db, "Courses");
      const coursesSnapshot = await getDocs(coursesCollection);
      const totalCourses = coursesSnapshot.size;
      setTotalCourses(totalCourses);
    };

    const fetchTotalResults = async () => {
      const resultsCollection = collection(db, "results");
      const resultsSnapshot = await getDocs(resultsCollection);
      const totalResults = resultsSnapshot.size;
      setTotalResults(totalResults);
    };

    fetchTotalStudents();
    fetchTotalDepartments();
    fetchTotalCourses();
    fetchTotalResults();
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } min-h-[100vh] flex flex-col justify-center items-center darkmode`}
    >
      <div className="w-[70vw] sm:scale-100 scale-75">
        <div className="flex flex-col transition-colors duration-200 items-center">
          <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center tracking-wide darkmode">
            Student Result Management <br className="hidden md:block" /> System
          </h1>
        </div>
        <div className="grid w-full max-w-screen-lg mx-auto my-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 md:px-8 pt-8">
            <Link to="/Student">
              <div className="display flex items-center cursor-pointer">
                Number of students :
                <div className="ml-2 text-2xl font-bold counter">
                  {totalStudents.toLocaleString()}
                </div>
              </div>
            </Link>

            <Link to="/Department">
              <div className="display flex items-center cursor-pointer">
                Departments Listed :
                <div className="ml-2 text-2xl font-bold counter">
                  {totalDepartments.toLocaleString()}
                </div>
              </div>
            </Link>

            <Link to="/Courses">
              <div className="display flex items-center cursor-pointer">
                Courses Listed :
                <div className="ml-2 text-2xl font-bold counter">
                  {totalCourses.toLocaleString()}
                </div>
              </div>
            </Link>

            <Link to="/Results">
              <div className="display flex items-center cursor-pointer">
                Results declared :
                <div className="ml-2 text-2xl font-bold counter">
                  {totalResults.toLocaleString()}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
