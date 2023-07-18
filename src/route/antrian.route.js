const express = require("express");
const {
  getAntrian,
  antrian,
  deleteAntrian,
  antrianPasien,
} = require("../controllers/antrian.controller");

const router = express.Router();

router
  .get("/antrian", antrian)
  .get("/antrian/pasien/:id", antrianPasien)

  .get("/antrian/:id", getAntrian)
  .delete("/antrian/:id", deleteAntrian);

module.exports = router;
