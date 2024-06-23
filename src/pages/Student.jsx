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
import ModalForm from "../components/ModalForm";
import UpdateStudentModal from "../components/UpdateStudentModal";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, "student");
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsData = studentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsData);
    };

    fetchStudents();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "student", id));
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  const handleAddStudent = async (formData) => {
    try {
      const newStudentRef = await addDoc(collection(db, "student"), formData);
      const newStudent = { id: newStudentRef.id, ...formData };
      setStudents([...students, newStudent]);
      toast.success("Student added successfully!");
    } catch (error) {
      console.error("Error adding student: ", error);
      toast.error("Error adding student. Please try again.");
    }
  };

  const handleUpdate = async (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleUpdateConfirm = async (updatedStudent) => {
    try {
      if (updatedStudent.id) {
        const studentRef = doc(db, "student", updatedStudent.id);
        await updateDoc(studentRef, {
          firstName: updatedStudent.firstName,
          lastName: updatedStudent.lastName,
          faculty: updatedStudent.faculty,
          emailAddress: updatedStudent.emailAddress,
          indexNumber: updatedStudent.indexNumber,
        });
        toast.success("Student updated successfully!");
        setStudents(
          students.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );
        setShowModal(false);
      } else {
        console.error("Invalid student ID");
        toast.error("Error updating student. Please try again.");
      }
    } catch (error) {
      console.error("Error updating student: ", error);
      toast.error("Error updating student. Please try again.");
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center w-[100vw] h-[100vh] darkmode sm:scale-100 scale-75`}
    >
      <div>
        {showModal && (
          <UpdateStudentModal
            onSubmit={handleUpdateConfirm}
            onClose={() => setShowModal(false)}
            theme={theme}
            student={editingStudent}
          />
        )}
      </div>
      <div>
        <button onClick={openModal} className="buttonStyle p-4 ">
          Register Student
        </button>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Faculty</th>
              <th>Email</th>
              <th>Index Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.faculty}</td>
                <td>{student.emailAddress}</td>
                <td>{student.indexNumber}</td>
                <td className="flex  gap-2 ">
                  <button
                    className="  buttonStyle px-3  "
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="buttonStyle px-3"
                    onClick={() => handleUpdate(student)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <ModalForm
          onSubmit={handleAddStudent}
          onClose={closeModal}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Student;
