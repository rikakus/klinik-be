require("dotenv").config();
const mysql = require("mysql2");
const db = mysql.createConnection(process.env.DB_URL);

db.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Connected to database!");
});

module.exports = db;
