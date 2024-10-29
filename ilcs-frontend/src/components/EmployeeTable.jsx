import React, { useState, useEffect } from "react";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeServices.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal.jsx";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    nik: "",
    name: "",
    address: "",
    birthdate: "",
    division: "",
    status: "",
  });

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    getEmployees();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      nik: "",
      name: "",
      address: "",
      birthdate: "",
      division: "",
      status: "",
    });
    setOpenAdd(true);
  };

  const handleOpenEdit = (employee) => {
    setFormData(employee);
    setOpenEdit(true);
  };

  const handleOpenDelete = (employee) => {
    setCurrentEmployee(employee);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setOpenDelete(false);
  };

  const handleAddEmployee = async (data) => {
    await addEmployee(data);
    const updatedEmployees = await fetchEmployees();
    setEmployees(updatedEmployees);
    handleClose();
  };

  const handleEditEmployee = async (data) => {
    await updateEmployee(data);
    const updatedEmployees = await fetchEmployees();
    setEmployees(updatedEmployees);
    handleClose();
  };

  const handleDeleteEmployee = async () => {
    await deleteEmployee(currentEmployee.nik);
    const updatedEmployees = await fetchEmployees();
    setEmployees(updatedEmployees);
    handleClose();
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">NIK</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Birthdate</TableCell>
              <TableCell align="center">Division</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.nik}>
                <TableCell align="center">{employee.nik}</TableCell>
                <TableCell align="center">{employee.name}</TableCell>
                <TableCell align="center">{employee.address}</TableCell>
                <TableCell align="center">{employee.birthdate}</TableCell>
                <TableCell align="center">{employee.division}</TableCell>
                <TableCell align="center">{employee.status}</TableCell>
                <TableCell align="center">
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenEdit(employee)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenDelete(employee)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{ marginTop: "30px" }}
        variant="contained"
        color="primary"
        onClick={handleOpenAdd}
      >
        Add Employee
      </Button>
      <AddEmployeeModal
        open={openAdd}
        onClose={handleClose}
        onAddEmployee={handleAddEmployee}
        formData={formData}
        setFormData={setFormData}
      />
      <EditEmployeeModal
        open={openEdit}
        onClose={handleClose}
        onEditEmployee={handleEditEmployee}
        formData={formData}
        setFormData={setFormData}
      />
      <DeleteEmployeeModal
        open={openDelete}
        onClose={handleClose}
        onDeleteEmployee={handleDeleteEmployee}
        currentEmployee={currentEmployee}
      />
    </div>
  );
};

export default EmployeeTable;
