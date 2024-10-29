const express = require("express");
const router = express.Router();

const EmployeeController = require("../controller/employees");

router.get("/", EmployeeController.getAllEmployees);
router.post("/", EmployeeController.addEmployee);
router.get("/:nik", EmployeeController.getEmployee);
router.put("/", EmployeeController.updateEmployee);
router.delete("/", EmployeeController.removeEmployee);

module.exports = router;
