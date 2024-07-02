import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { useContext } from "react";
import { ThemeContext } from "../App";

function Courses() {
  const { theme } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    db.collection('departments').get().then((querySnapshot) => {
      const departments = querySnapshot.docs.map((doc) => doc.data());
      setDepartments(departments);
    });
  }, []);

  useEffect(() => {
    if (selectedDepartment && selectedYear && selectedSemester) {
      db.collection('courses')
       .where('department', '==', selectedDepartment)
       .where('year', '==', selectedYear)
       .where('semester', '==', selectedSemester)
       .orderBy('year', 'asc')
       .orderBy('semester', 'asc')
       .get()
       .then((querySnapshot) => {
          const courses = querySnapshot.docs.map((doc) => doc.data());
          setCourses(courses);
        });
    }
  }, [selectedDepartment, selectedYear, selectedSemester]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  return (
    <div className={`${
      theme === "dark" ? "dark" : "light"
    }w-[100vw] h-[100vh] sm:scale-100 scale-75 darkmode`}>
      <h1>Courses</h1>
      <select value={selectedDepartment} onChange={handleDepartmentChange}>
        {departments.map((department) => (
          <option  key={department.name}  value={department.name}>{department.name}</option>
        ))}
      </select>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">Select Year</option>
        <option value="Year 1">Year 1</option>
        <option value="Year 2">Year 2</option>
        <option value="Year 3">Year 3</option>
        <option value="Year 4">Year 4</option>
      </select>
      <select value={selectedSemester} onChange={handleSemesterChange}>
        <option value="">Select Semester</option>
        <option value="Semester 1">Semester 1</option>
        <option value="Semester 2">Semester 2</option>
      </select>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Courses