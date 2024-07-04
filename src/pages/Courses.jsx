/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { ThemeContext } from "../App";
import { db } from "../firebase/firebase";
import UpdateCourseModal from "../components/UpdateCourseModal";
import toast from "react-hot-toast";

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
        }); // Increase timeout to 60 seconds
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Courses", id));
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
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
      } else {
        console.error("Invalid course ID");
        toast.error("Error updating course. Please try again.");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Error updating course. Please try again.");
    }
  };


  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center flex-col  h-[100vh] w-[100vw] darkmode sm:scale-100 scale-[65%]`}
    >
      <div>
        <h1>Available Courses</h1>
      </div>

      <div>
        {(isAddModalOpen || editingCourse) && (
          <UpdateCourseModal
            onSubmit={isAddModalOpen ? handleAddCourse : handleUpdateConfirm}
            onClose={
              isAddModalOpen ? closeAddModal : () => setEditingCourse(null)
            }
            theme={theme}
            course={
              editingCourse || {
                courseName: "",
                courseCode: "",
                department: "",
              }
            }
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-end scale-[70%]  gap-2">
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Department</th>
              {/* Add more columns for other course fields */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.id}</td>
                <td>{course.year}</td>
                <td>{course.semester}</td>
                <td>{course.department}</td>

                <td className="flex  gap-4 ">
                  <button
                    className="buttonStyle px-3"
                    onClick={() => handleUpdate(course)}
                  >
                    Update
                  </button>
                  <button
                    className="buttonStyle px-3"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-11">
          <button onClick={openAddModal} className="buttonStyle p-4  ">
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
