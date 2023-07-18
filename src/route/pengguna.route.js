const express = require("express");

const {
  dokter,
  pasien,
  edit,
  input,
  deletePengguna,
  pengguna,
} = require("../controllers/pengguna.controller");

const router = express.Router();

router
  .get("/dokter", dokter)
  .get("/pasien", pasien)
  .get("/pengguna/:id", pengguna)
  .put("/pengguna", edit)
  .post("/pengguna", input)
  .delete("/pengguna/:id", deletePengguna);

module.exports = router;
