/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");

  const addDepartment = () => {
    if (newDepartment.trim() !== "") {
      setDepartments([...departments, { id: Date.now(), name: newDepartment }]);
      setNewDepartment("");
    }
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((department) => department.id !== id));
  };

  return (
    <div className="pt-28 w-[100vw] sm:scale-100 darkmode scale-75">
      <h2>Department Management</h2>
      <div>
        <input
          type="text"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          placeholder="Enter new department"
        />
        <button className="buttonStyle" onClick={addDepartment}>Add Department</button>
      </div>
      <ul>
        {departments.map((department) => (
          <li key={department.id}>
            {department.name}
            <button onClick={() => deleteDepartment(department.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Department;
