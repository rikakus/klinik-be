const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const { moment } = require("moment");
const date = require("../helpers/date");
const { Client } = require("whatsapp-web.js");
const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  },
});
const fs = require("fs");

const qrcode = require("qrcode");

module.exports = {
  authWhatsApp: async (req, res) => {
    try {
      client.getState().then((response) => {
        if (response === "CONNECTED") {
          success(res, "Sudah", "success", "QR code generated");
        }
      });
      let qrSent = false;
      client.on("qr", async (qr) => {
        console.log(qr);
        console.log(qrSent);
        if (!qrSent) {
          console.log("jalan");
          const qrData = await qr;

          await qrcode.toDataURL(
            qrData,
            {
              errorCorrectionLevel: "H",
              type: "png",
              margin: 4,
            },
            (err, url) => {
              if (err) {
                console.error("Error generating QR code:", err);
                failed(res, err.message, "failed", "Gagal Mendapatkan QR Code");
              } else {
                success(res, url, "success", "QR code generated");
                // res.writeHead(200, { "Content-Type": "text/html" });
                // res.write(`<img src="${url}" alt="QR Code"/>`);
                // res.end();
              }
            }
          );
          qrSent = true;
        }
      });

      client.on("authenticated", () => {
        console.log("Klien terotentikasi");
      });

      client.on("ready", () => {
        console.log("WhatsApp siap digunakan");
      });
    } catch (err) {
      console.log(err);
      failed(res, err.message, "failed", "Gagal Mendapatkan QR Code");
    }
  },
  sendWhatsApp: (req, res) => {
    try {
      const phoneNumber = req.body.nomor;
      const message = req.body.pesan;

      const number = `62${phoneNumber}@c.us`;
      client
        .sendMessage(number, message)
        .then(() => {
          success(res, "", "success", "Pesan Sudah Terkirim");
        })
        .catch((error) => {
          failed(res, error, "failed", "Pesan gagal Terkirim");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Pesan gagal Terkirim");
    }
  },
  disconnect: (req, res) => {
    try {
      client
        .logout()
        .then(() => {
          // client.destroy();
          success(res, "Berhasil Keluar", "success", "Berhasil Keluar");
        })
        .catch((error) => {
          failed(res, error, "failed", "Gagal Keluar");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Keluar");
    }
  },
  cek: (req, res) => {
    try {
      client.getState().then((response) => {
        success(res, response, "success", "Berhasil Cek Koneksi");
      });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Cek Koneksi");
    }
  },
};
client.initialize();
