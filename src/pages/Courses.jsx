import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { ThemeContext } from "../App";
import { db } from "../firebase/firebase";
import UpdateCourseModal from "../components/UpdateCourseModal";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { dark } from "@mui/material/styles/createPalette";


const DepartmentExpander = ({ data, handleUpdate,  }) => {
  const [expandedYear, setExpandedYear] = useState(null);

  return (
    <div>
      {Object.entries(data.years).map(([year, yearData]) => (
        <div key={year}>
          <button className="px-2.5 flex items-center gap-2" onClick={() => setExpandedYear(expandedYear === year ? null : year)}>
            {expandedYear === year ? <FaChevronDown /> : <FaChevronRight />}
            {year}
          </button>
          {expandedYear === year && (
            <YearExpander data={yearData} handleUpdate={handleUpdate} />
          )}
        </div>
      ))}
    </div>
  );
};


const YearExpander = ({ data, handleUpdate }) => {
  const [expandedSemester, setExpandedSemester] = useState(null);

  return (
    <div>
      {Object.entries(data.semesters).map(([semester, semesterData]) => (
        <div key={semester}>
          <button className="px-2.5 flex items-center gap-2" onClick={() => setExpandedSemester(expandedSemester === semester ? null : semester)}>
            {expandedSemester === semester ? <FaChevronDown /> : <FaChevronRight />}
            {semester}
          </button>
          {expandedSemester === semester && (
            <SemesterExpander data={semesterData} handleUpdate={handleUpdate} />
          )}
        </div>
      ))}
    </div>
  );
};

const SemesterExpander = ({ data, handleUpdate }) => {
  const columns = [
    { name: "Course Name", selector: (row) => row.name },
    { name: "Course Code", selector: (row) => row.id },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-4">
          <button
            className="buttonStyle px-3"
            onClick={() => handleUpdate(row)}
          >
            Update
          </button>
          
        </div>
      ),
    },
  ];

  return (
    <DataTable
    className="h-[100vh] w-[100vw] py-10"
      columns={columns}
      data={data.courses}
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[5, 10, 20, 30]}
      sortable
    />
  );
};

const Courses = () => {
  const { theme } = useContext(ThemeContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, "Courses");
      try {
        const coursesSnapshot = await getDocs(coursesCollection, {
          timeout: 60000,
        });
        const coursesData = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, []);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

 

  const handleAddCourse = async (formData) => {
    try {
      const coursesCollection = collection(db, "Courses");
      const newCourseRef = await addDoc(coursesCollection, formData);
      const newCourse = { id: newCourseRef.id, ...formData };
      setCourses([...courses, newCourse]);
      toast.success("Course added successfully!");
      closeAddModal();
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Error adding course. Please try again.");
    }
  };

  const handleUpdate = async (course) => {
    setEditingCourse(course);
  };

  const handleUpdateConfirm = async (updatedCourse) => {
    try {
      if (updatedCourse.id) {
        const courseRef = doc(db, "Courses", updatedCourse.id);
        await updateDoc(courseRef, updatedCourse);
        toast.success("Course updated successfully!");
        setCourses(
          courses.map((course) =>
            course.id === updatedCourse.id ? updatedCourse : course
          )
        );
        setEditingCourse(null);
      } else {
        console.error("Invalid course ID");
        toast.error("Error updating course. Please try again.");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Error updating course. Please try again.");
    }
  };

  const columns = [{ name: "Department", selector: (row) => row.department }];

  const data = groupCourseData(courses);

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center flex-col h-[100vh] w-[100vw] darkmode sm:scale-100 scale-[95%]`}
    >
      <div>
        <h1>Available Courses</h1>
      </div>

      {(isAddModalOpen || editingCourse) && (
        <UpdateCourseModal
          onSubmit={isAddModalOpen ? handleAddCourse : handleUpdateConfirm}
          onClose={
            isAddModalOpen ? closeAddModal : () => setEditingCourse(null)
          }
          theme={theme}
          course={
            editingCourse || { courseName: "", courseCode: "", department: "" }
          }
        />
      )}
<div className="table-wrapper " style={{ width: '85%', overflow: 'auto', }}>
  <DataTable
    className={`darkmode ${
      theme === "dark" ? "bg-black text-white" : ""
    } text-sm`}
    columns={columns}
    data={data}
    expandableRows
    expandableRowsComponent={({ data }) => (
      <DepartmentExpander
        theme={dark}
        data={data}
        handleUpdate={handleUpdate}
        
      />
    )}
  />
</div>

      <div className="flex justify-center mt-11">
        <button onClick={openAddModal} className="buttonStyle p-4">
          Add Course
        </button>
      </div>
    </div>
  );
};

const groupCourseData = (courses) => {
  const groupedData = {};
  courses.forEach(course => {
    if (!groupedData[course.department]) {
      groupedData[course.department] = { years: {} };
    }
    const yearKey = `Year: ${course.year}`;
    const semesterKey = `Semester: ${course.semester}`;
    if (!groupedData[course.department].years[yearKey]) {
      groupedData[course.department].years[yearKey] = { semesters: {} };
    }
    if (!groupedData[course.department].years[yearKey].semesters[semesterKey]) {
      groupedData[course.department].years[yearKey].semesters[semesterKey] = { courses: [] };
    }
    groupedData[course.department].years[yearKey].semesters[semesterKey].courses.push(course);
  });
  return Object.entries(groupedData).map(([department, data]) => ({ department, ...data }));
};


DepartmentExpander.propTypes = {
  data: PropTypes.shape({
    years: PropTypes.object.isRequired,
  }).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

YearExpander.propTypes = {
  data: PropTypes.shape({
    semesters: PropTypes.object.isRequired,
  }).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

SemesterExpander.propTypes = {
  data: PropTypes.shape({
    courses: PropTypes.array.isRequired,
  }).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Courses;
