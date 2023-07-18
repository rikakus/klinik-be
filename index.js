const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const path = require("path");
const authRoute = require("./src/route/auth.route");
const whatsappRoute = require("./src/route/whatsapp.route");
const antrianRoute = require("./src/route/antrian.route");
const periksaRoute = require("./src/route/periksa.route");
const jadwalRoute = require("./src/route/jadwal.route");
const penggunaRoute = require("./src/route/pengguna.route");

const app = express();
app.use(bodyParser.json());
app.use(xss());
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use(authRoute);
app.use(whatsappRoute);
app.use(antrianRoute);
app.use(periksaRoute);
app.use(jadwalRoute);
app.use(penggunaRoute);

app.use(express.static(path.join(__dirname, "public")));

const APP_PORT = process.env.PORT || 3003;
app.listen(APP_PORT, () => {
  console.log(`service running on PORT ${APP_PORT}`);
});
