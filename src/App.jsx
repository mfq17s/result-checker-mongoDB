import "../src/App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Student from "./pages/Student";
import Footer from "./components/Footer";
import ChangePassword from "./pages/ChangePassword";
import Courses from "./pages/Courses";
import Department from "./pages/Department";
import Semester from "./pages/Semester";
import Results from "./pages/Results";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import StudentResults from "./pages/StudentResults";
import Admins from "./pages/Admins";
import { createContext } from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import ManageAdmin from "./pages/ManageAdmin";

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`App ${theme === "dark" ? "dark" : ""}`} id="theme">
        <main className="darkmode">
          <div>
            <Toaster />
          </div>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/Student" element={<Student />} />
            <Route path="/Courses" element={<Courses />} />
            <Route path="/Department" element={<Department />} />
            <Route path="/StudentResults" element={<StudentResults />} />
            <Route path="/Admins" element={<Admins />} />
            <Route path="/Semester" element={<Semester />} />
            <Route path="/Results" element={<Results />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/ManageAdmin" element={<ManageAdmin />} />
            <Route path="/StudentLogin" element={<StudentLogin />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
