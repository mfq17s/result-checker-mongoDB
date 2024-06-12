import { useContext } from "react";
import { ThemeContext } from "../App";

const Home = () => {
  const { theme } = useContext(ThemeContext);

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
            <div className="display">Number of students :</div>
            <div className="display">Departments Listed :</div>
            <div className="display">Courses Listed :</div>
            <div className="display">Results declared :</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
