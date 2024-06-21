/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ModalForm = ({ onSubmit, onClose, theme }) => {
  const [formData, setFormData] = useState({
    academicYear: '',
    date: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    gender: '',
    faculty: '',
    schedule: [],
    phoneNumber: '',
    emergencyNumber: '',
    emailAddress: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      let newSchedule = [...formData.schedule];
      if (checked) {
        newSchedule = [...newSchedule, value];
      } else {
        newSchedule = newSchedule.filter((item) => item !== value);
      }
      setFormData({ ...formData, schedule: newSchedule });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } p-8 rounded-lg shadow-lg max-w-3xl w-full scale-75 overflow-y-auto max-h-[80vh]`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register Student</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="academicYear" className="block mb-2">
              Academic Year
            </label>
            <input
              type="text"
              id="academicYear"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="nationality" className="block mb-2">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="faculty" className="block mb-2">
              Faculty
            </label>
            <select
              id="faculty"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            >
              <option value="">Select Faculty</option>
              <option value="business">Business</option>
              <option value="science">Science</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2">Schedule</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="schedule"
                  value="day"
                  checked={formData.schedule.includes('day')}
                  onChange={handleChange}
                  className="mr-2"
                />
                Day
              </label>
              <label>
                <input
                  type="checkbox"
                  name="schedule"
                  value="evening"
                  checked={formData.schedule.includes('evening')}
                  onChange={handleChange}
                  className="mr-2"
                />
                Evening
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="emergencyNumber" className="block mb-2">
              Emergency Number
            </label>
            <input
              type="tel"
              id="emergencyNumber"
              name="emergencyNumber"
              value={formData.emergencyNumber}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="emailAddress" className="block mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className={`w-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
              } p-2 rounded-md`}
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className={`${
                theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded`}
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className={`${
                theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
              } text-white font-bold py-2 px-4 rounded ml-4`}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ModalForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default ModalForm;
