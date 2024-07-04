
import { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateCourseModal = ({ onSubmit, onClose, theme, course }) => {
  const [formData, setFormData] = useState({
    name: course.name || '',
    id: course.id || '',
    department: course.department || '',
    year: course.year || '',
    semester: course.semester || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      id: '',
      department: '',
      year: '',
      semester: '',
    });
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        theme === 'dark' ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-500 bg-opacity-75'
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`bg-white rounded-lg shadow-lg p-6 darkmode ${
            theme === 'dark' ? 'bg-gray-800 text-white' : ''
          }`}
        >
          <h2 className="text-xl font-bold mb-4">
            {course.id ? 'Update Course' : 'Add Course'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 darkmode">
              <label htmlFor="name" className="block font-bold mb-2">
                Course Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200'
                }`}
              />
            </div>
            {/* ... other input fields ... */}
            <div className="mb-4">
              <label htmlFor="id" className="block font-bold mb-2">
                Course Code
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id || ""}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md darkmode`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="block font-bold mb-2">
                Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md darkmode`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="semester" className="block font-bold mb-2">
                Semester
              </label>
              <input
                type="text"
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md darkmode`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="department" className="block font-bold mb-2 ">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md darkmode`}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                {course.id ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UpdateCourseModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  course: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    year: PropTypes.string,
    semester: PropTypes.string,
  }).isRequired,
};

export default UpdateCourseModal;
