require("dotenv").config();
const mysql = require("mysql2");
const db = mysql.createConnection(process.env.DB_URL);
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });
db.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Connected to database!");
});

module.exports = db;
