const express = require("express");
const {
  authWhatsApp,
  sendWhatsApp,
  disconnect,
  cek,
} = require("../controllers/whatsapp.controller");

const router = express.Router();

router
  .get("/qr", authWhatsApp)
  .get("/cek", cek)

  .post("/send", sendWhatsApp)
  .get("/disconnect", disconnect);

module.exports = router;
