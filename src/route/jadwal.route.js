const express = require("express");
const {
  addJadwal,
  jadwal,
  editJadwal,
  deleteJadwal,
} = require("../controllers/jadwal.controller");

const router = express.Router();

router
  .post("/jadwal", addJadwal)
  .put("/jadwal", editJadwal)
  .get("/jadwal", jadwal)
  .delete("/jadwal/:id", deleteJadwal);

module.exports = router;
