const express = require("express");
const {
  addPeriksa,
  periksa,
  periksaDokter,
  editPeriksa,
  periksaDokterById,
} = require("../controllers/periksa.controller");

const router = express.Router();

router
  .post("/periksa/pasien", addPeriksa)
  .put("/periksa/dokter", editPeriksa)
  .get("/periksa/pasien/:id", periksa)
  .get("/periksa/dokter/:id", periksaDokterById)
  .get("/periksa", periksaDokter);

module.exports = router;
