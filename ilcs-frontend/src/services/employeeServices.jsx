import axios from "axios";

const API_URL = "http://localhost:4000/employee";

export const fetchEmployees = async () => {
  const response = await axios.get(API_URL);
  if (Array.isArray(response.data.data)) {
    return response.data.data.map((employee) => ({
      ...employee,
      birthdate: new Date(employee.birthdate).toISOString().slice(0, 10),
    }));
  } else {
    throw new Error("Expected an array, but got: " + response.data.data);
  }
};

export const addEmployee = async (employeeData) => {
  await axios.post(API_URL, employeeData);
};

export const updateEmployee = async (employeeData) => {
  await axios.put(API_URL, employeeData);
};

export const deleteEmployee = async (nik) => {
  await axios.delete(API_URL, { data: { nik } });
};
