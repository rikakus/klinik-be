const express = require("express");
const {
  login,
  register,
  aktivasi,
  getToken,
  getTokenEmail,
  changePassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router
  .post("/login", login)
  .post("/register", register)
  .post("/token", getToken)
  .post("/password", getTokenEmail)
  .post("/forgot", changePassword)

  .post("/aktivasi", aktivasi);

module.exports = router;
