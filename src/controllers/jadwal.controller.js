const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const date = require("../helpers/date");
const getEstimasi = require("../helpers/getEstimasi");
const sendEmail = require("../helpers/sendMail");
const bcrypt = require("bcrypt");
const sendEmailPassword = require("../helpers/sendPassword");
const jadwalModel = require("../models/jadwal.model");
const usersModel = require("../models/auth.model");

module.exports = {
  jadwal: async (req, res) => {
    try {
      jadwalModel
        .getAllData()
        .then(async (result) => {
          const data = await Promise.all(
            result.map(async (e, i) => {
              const hasil = await usersModel
                .detailusers(e.id_dokter)
                .then((response) => {
                  if (response.length !== 0) {
                    e.idDokter = response[0].id;
                    e.nama = response[0].nama;
                    e.hadir = e.hadir === 0 ? false : true;
                    return e;
                  } else {
                    e.hadir = e.hadir === 0 ? false : true;
                    return e;
                  }
                });
              return hasil;
            })
          );
          success(res, data, "success", "Berhasil Mendapatkan Jadwal");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Jadwal");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal  Mendapatkan Jadwal");
    }
  },
  addJadwal: async (req, res) => {
    try {
      const body = req.body;
      const { idDokter, masuk, keluar, hadir } = body;
      const id = uuidv4();
      console.log(hadir);
      jadwalModel
        .addJadwal({
          id,
          idDokter,
          masuk,
          keluar,
          hadir,
          dibuat: date(),
          diupdate: date(),
        })
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menambah Jadwal");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambah Jadwal");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambah Jadwal");
    }
  },
  editJadwal: async (req, res) => {
    try {
      const body = req.body;
      const { idDokter, masuk, keluar, hadir, id } = body;
      jadwalModel
        .editJadwal({
          id,
          idDokter,
          masuk: moment(masuk).format("HH:mm"),
          keluar: moment(keluar).format("HH:mm"),
          hadir,
          diupdate: date(),
        })
        .then((result) => {
          success(
            res,
            { ...result, id },
            "success",
            "Berhasil Mengubah Jadwal"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengubah Jadwal");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengubah Jadwal");
    }
  },
  deleteJadwal: async (req, res) => {
    try {
      const id = req.params.id;

      console.log(id);
      jadwalModel
        .deleteJadwal(id)
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menghapus Jadwal");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menghapus Jadwal");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menghapus Jadwal");
    }
  },
};
