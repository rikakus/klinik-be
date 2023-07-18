const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const date = require("../helpers/date");
const getEstimasi = require("../helpers/getEstimasi");
const sendEmail = require("../helpers/sendMail");
const bcrypt = require("bcrypt");
const sendEmailPassword = require("../helpers/sendPassword");
const antrianModel = require("../models/antrian.model");
const usersModel = require("../models/auth.model");

module.exports = {
  antrian: async (req, res) => {
    try {
      antrianModel
        .getAllData()
        .then(async (result) => {
          const data = await Promise.all(
            result.map(async (e, i) => {
              const hasil = await usersModel
                .detailusers(e.id_pengguna)
                .then((response) => {
                  if (response.length !== 0) {
                    e.nama = response[0].nama;
                    e.estimasi = moment(e.estimasi).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    return e;
                  } else {
                    e.estimasi = moment(e.estimasi).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    return e;
                  }
                });
              return hasil;
            })
          );
          success(res, data, "success", "Berhasil Mengambil Antrian");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengambil Antrian");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengambil Antrian");
    }
  },
  antrianPasien: async (req, res) => {
    try {
      const id = req.params.id;

      antrianModel
        .getDataId(id)
        .then(async (result) => {
          const data = await Promise.all(
            result.map(async (e, i) => {
              const hasil = await usersModel
                .detailusers(e.id_pengguna)
                .then((response) => {
                  if (response.length !== 0) {
                    e.nama = response[0].nama;
                    e.estimasi = moment(e.estimasi).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    return e;
                  } else {
                    e.estimasi = moment(e.estimasi).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    return e;
                  }
                });
              return hasil;
            })
          );
          success(res, data, "success", "Berhasil Mengambil Antrian");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengambil Antrian");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengambil Antrian");
    }
  },
  getAntrian: async (req, res) => {
    try {
      const idPengguna = req.params.id;
      antrianModel
        .getDataToday(moment(new Date()).format("YYYY-MM-DD"))
        .then(async (result) => {
          console.log(result);
          let newEstimasi;
          let antrian;
          if (result.length === 0) {
            console.log("ini jalan");
            newEstimasi = await getEstimasi(new Date());
            antrian = 1;
          } else if (Math.floor(result[0].estimasi) >= Math.floor(new Date())) {
            console.log("jalan");
            newEstimasi = await getEstimasi(new Date(result[0].estimasi));
            antrian = result[0].antrian + 1;
          }

          const id = uuidv4();
          antrianModel
            .addAntrian({
              id,
              idPengguna,
              estimasi: newEstimasi,
              antrian,
              sudahSelasai: false,
              dibuat: date(),
              diupdate: date(),
            })
            .then((result) => {
              console.log(antrian);
              success(res, { id, antrian }, "success", "Berhasil Mengantri");
            })
            .catch((err) => {
              failed(res, err.message, "failed", "Gagal Mengantri");
            });
          // console.log(result);
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengantri");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengantri");
    }
  },
  deleteAntrian: async (req, res) => {
    try {
      const id = req.params.id;

      antrianModel
        .deleteAntrian(id)
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menhapus Antrian");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menhapus Antrian");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menhapus Antrian");
    }
  },
};
