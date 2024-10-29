const dbPool = require("../config/database");

const generateNik = async (division) => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  let prefix = "";

  switch (division) {
    case "IT":
      prefix = `10${currentYear}`;
      break;
    case "HRD":
      prefix = `11${currentYear}`;
      break;
    case "FINANCE":
      prefix = `12${currentYear}`;
      break;
    default:
      throw new Error("Invalid division");
  }

  const [rows] = await dbPool.execute(
    `SELECT nik FROM m_karyawan WHERE nik LIKE ? ORDER BY nik DESC LIMIT 1`,
    [`${prefix}%`]
  );

  let sequence = 1;
  if (rows.length > 0) {
    const lastNik = rows[0].nik;
    sequence = parseInt(lastNik.slice(4), 10) + 1;
  }

  const newNik = `${prefix}${sequence.toString().padStart(4, "0")}`;
  return newNik;
};

module.exports = { generateNik };
