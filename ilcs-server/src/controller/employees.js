const employeesModel = require("../models/m_karyawan");

const getAllEmployees = async (req, res) => {
  try {
    const [data] = await employeesModel.getAllEmployees();

    res.status(200).json({
      message: "Success Get All Employees",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

// Get Employee by NIK
const getEmployee = async (req, res) => {
  try {
    const { nik } = req.params;

    const [rows] = await employeesModel.getEmployee(nik);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Success Get Employee by NIK",
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

// Adding new employee
const addEmployee = async (req, res, next) => {
  try {
    const { body } = req;
    await employeesModel.addEmployee(body);
    res.json({
      message: "Success Creating an Employee!",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const { body } = req;

    const result = await employeesModel.updateEmployee(body);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Success Editing an Employee!",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

// Remove employee
const removeEmployee = async (req, res) => {
  const { nik } = req.body;

  if (!nik) {
    return res.status(400).json({
      message: "NIK is required to delete an employee.",
    });
  }

  try {
    const result = await employeesModel.removeEmployee(nik);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    res.status(200).json({
      message: "Employee successfully removed.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  removeEmployee,
};
