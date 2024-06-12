import DataTable from "react-data-table-component";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ThemeContext } from "../App";
import { useContext } from "react";



function Courses() {
  const { theme } = useContext(ThemeContext);
  const columns = [
    {
      name: "Course Name",
      selector: (row) => row.courseName,
      sortable: true,
    },
    {
      name: "Course Code",
      selector: (row) => row.courseCode,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      courseName: "Algebra",
      courseCode: "Ict 123",
      department: "BSC ICT",
    },
    {
      id: 2,
      courseName: "Adobe",
      courseCode: "GD 123",
      department: "Graphics",
    },
    {
      id: 3,
      courseName: "Economics",
      courseCode: "Bs 123",
      department: "Business",
    },
    {
      id: 4,
      courseName: "Calculus",
      courseCode: "FA 723",
      department: "Fashion",
    },
    {
      id: 5,
      courseName: "EAccounting",
      courseCode: "Ict 123",
      department: "Business",
    },
  ];
  const [records, setRecords] = useState(data);
  const [openDialog, setOpenDialog] = useState(false);

  function handleFilter(event) {
    const newData = data.filter((row) => {
      return row.courseName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : "light"
      }w-[100vw] h-[100vh] sm:scale-100 scale-75 darkmode`}
    >
      <div className="flex flex-col transition-colors duration-200 items-center">
        <h1 className="text-3xl sm:text-3xl lg:text-5xl text-center tracking-wide">
          Manage Courses
        </h1>
      </div>
      <div className="text-xs text-black mt-5 mb-5 gap-2 w-full flex items-center justify-end ">
        <label htmlFor="search">Search Course : </label>
        <input
          id="search"
          type="text"
          onChange={handleFilter}
          placeholder="Search"
          className="w-2/5 mr-20 rounded-sm border-x-black p-1"
        />
      </div>
      <div>
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          FixedHeader
          pagination
        ></DataTable>
      </div>

      <button
        className="buttonStyle mt-9"
        onClick={handleOpenDialog}
      >
        Add Course 
      </button>

      <Dialog
        className="w-screen flex items-center justify-center"
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle className="flex items-center justify-center">
          Add Course
        </DialogTitle>
        <DialogContent className=" w-full darkmode">
          <form
            action=""
            className="flex justify-start items-center flex-col gap-5"
          >
            <input id="name" type="text" placeholder="Enter Course Name" />
            <input name="code" type="text" placeholder="Enter Course Code" />
            <input id="department" type="text" placeholder="Enter Department" />
            <button>Add</button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Courses;
