const dbPool = require("../config/database");
const { generateNik } = require("../utils/generateNik");

const getAllEmployees = () => {
  const SQLQuery = "SELECT * FROM m_karyawan";

  return dbPool.execute(SQLQuery);
};

const getEmployee = async (nik) => {
  console.log(nik); // Check if nik is correctly logged

  const SQLQuery = `SELECT * FROM m_karyawan WHERE nik = ?`;
  return dbPool.execute(SQLQuery, [nik]);
};

const addEmployee = async (body) => {
  const nik = await generateNik(body.division);
  const SQLQuery = `INSERT INTO m_karyawan (nik, name, address, birthdate, division, status, created_date)
                    VALUES (?, ?, ?, ?, ?, ?, NOW())`;

  return dbPool.execute(SQLQuery, [
    nik,
    body.name,
    body.address,
    body.birthdate,
    body.division,
    body.status,
  ]);
};

const updateEmployee = async (body) => {
  const { nik, name, address, birthdate, division, status } = body;

  let SQLQuery = `UPDATE m_karyawan SET `;
  const updates = [];
  const params = [];

  if (name !== undefined) {
    updates.push("name = ?");
    params.push(name);
  }
  if (address !== undefined) {
    updates.push("address = ?");
    params.push(address);
  }
  if (birthdate !== undefined) {
    updates.push("birthdate = ?");
    params.push(birthdate);
  }
  if (division !== undefined) {
    updates.push("division = ?");
    params.push(division);
  }
  if (status !== undefined) {
    updates.push("status = ?");
    params.push(status);
  }

  if (updates.length === 0) {
    throw new Error("No fields provided for update.");
  }

  SQLQuery += updates.join(", ") + " WHERE nik = ?";
  params.push(nik);

  return dbPool.execute(SQLQuery, params);
};

const removeEmployee = async (nik) => {
  const SQLQuery = `DELETE FROM m_karyawan WHERE nik = ?`;
  return dbPool.execute(SQLQuery, [nik]);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  removeEmployee,
};
