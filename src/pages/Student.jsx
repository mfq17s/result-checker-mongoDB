import { ThemeContext } from "../App";
import { useContext, useState } from "react";
import ModalForm from "../components/ModalForm";

const Student = () => {
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData) => {
    // Handle form submission logic here
    console.log(formData);
    closeModal();
  };

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      } flex justify-center items-center w-[100vw] h-[100vh] darkmode sm:scale-100 scale-75`}
    >
      <div>
        <button onClick={openModal} className="buttonStyle p-4 ">
          Register Student
        </button>
      </div>
      {isModalOpen && (
        <ModalForm
          onSubmit={handleSubmit}
          onClose={closeModal}
          className="darkmode"
        />
      )}
    </div>
  );
};

export default Student;
