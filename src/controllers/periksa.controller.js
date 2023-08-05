const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const date = require("../helpers/date");
const getEstimasi = require("../helpers/getEstimasi");
const sendEmail = require("../helpers/sendMail");
const bcrypt = require("bcrypt");
const sendEmailPassword = require("../helpers/sendPassword");
const periksaModel = require("../models/periksa.model");
const usersModel = require("../models/auth.model");

module.exports = {
  periksa: async (req, res) => {
    try {
      const id = req.params.id;
      periksaModel
        .periksa(id)
        .then(async (result) => {
          const data = await Promise.all(
            result.map(async (e, i) => {
              const hasil = await usersModel
                .detailusers(e.id_pengguna)
                .then((response) => {
                  if (response.length !== 0) {
                    e.nama = response[0].nama;
                    return e;
                  } else {
                    return e;
                  }
                });
              return hasil;
            })
          );
          success(res, data, "success", "Berhasil Mendapatkan Riwayat");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Riwayat");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Riwayat");
    }
  },

  periksaDokterById: async (req, res) => {
    try {
      const id = req.params.id;
      periksaModel
        .periksaDokterById(id)
        .then(async (result) => {
          success(res, result, "success", "Berhasil Mendapatkan Riwayat");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Riwayat");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Riwayat");
    }
  },
  periksaDokter: async (req, res) => {
    try {
      const id = req.params.id;
      periksaModel
        .periksaDokter()
        .then(async (result) => {
          success(res, result, "success", "Berhasil Mendapatkan Riwayat");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Riwayat");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Riwayat");
    }
  },
  addPeriksa: async (req, res) => {
    try {
      const body = req.body;
      const { idPengguna, keluhan } = body;

      const id = uuidv4();

      periksaModel
        .addPeriksa({
          id,
          idPengguna,
          keluhan,
          nasihat: null,
          diagnosa: null,
          resepDokter: null,
          idDokter: null,
          sudahSelesai: false,
          dibuat: date(),
          diupdate: date(),
        })
        .then((result) => {
          success(
            res,
            { ...result, id },
            "success",
            "Berhasil Menambah Riwayat"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambah Riwayat");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambah Riwayat");
    }
  },

  editPeriksa: async (req, res) => {
    try {
      const body = req.body;
      const { id, nasihat, diagnosa, resepDokter, idDokter, sudahSelesai } =
        body;

      periksaModel
        .editPeriksa({
          id,
          nasihat,
          diagnosa,
          resepDokter,
          idDokter,
          sudahSelesai,
          diupdate: date(),
        })
        .then((result) => {
          success(
            res,
            { ...result, id },
            "success",
            "Berhasil Mengubah Riwayat"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengubah Riwayat");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengubah Riwayat");
    }
  },
};
