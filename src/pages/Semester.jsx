import { useContext } from "react";
import { ThemeContext } from "../App";

function Semester() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === "dark" ? "dark" : "light"} scale-75 h-[100vh] darkmode`}>
      <div>
        <p>luck you</p>
      </div>
    </div>
  );
}

export default Semester;
