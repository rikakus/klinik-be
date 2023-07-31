const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const date = require("../helpers/date");
const getEstimasi = require("../helpers/getEstimasi");
const sendEmail = require("../helpers/sendMail");
const bcrypt = require("bcrypt");
const sendEmailPassword = require("../helpers/sendPassword");
const penggunaModel = require("../models/pengguna.model");
const authModel = require("../models/auth.model");

const getToken = () => {
  let digits = "";
  const numberOfDigits = 6;

  for (let i = 0; i < numberOfDigits; i++) {
    let randomDigit = Math.floor(Math.random() * 9) + 1;
    digits += randomDigit.toString();
  }

  return digits;
};

module.exports = {
  pengguna: async (req, res) => {
    try {
      const id = req.params.id;

      authModel
        .detailusers(id)
        .then(async (result) => {
          success(res, result, "success", "Berhasil Mendapatkan Pengguna");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal  Mendapatkan Pengguna");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal  Mendapatkan Pengguna");
    }
  },
  dokter: async (req, res) => {
    try {
      penggunaModel
        .getDokter()
        .then(async (result) => {
          success(res, result, "success", "Berhasil Mendapatkan Dokter");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal  Mendapatkan Dokter");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal  Mendapatkan Dokter");
    }
  },
  pasien: async (req, res) => {
    try {
      penggunaModel
        .getPasien()
        .then(async (result) => {
          success(res, result, "success", "Berhasil Mendapatkan Pasien");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal  Mendapatkan Pasien");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal  Mendapatkan Pasien");
    }
  },
  edit: async (req, res) => {
    try {
      const body = req.body;
      const { nama, id, jenisKelamin, agama, tanggalLahir, alamat, ktp, noHp } =
        body;

      penggunaModel
        .editPengguna({
          nama,
          diupdate: date(),
          id,
          jenisKelamin,
          agama,
          tanggalLahir,
          alamat,
          ktp,
          noHp,
        })
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Mengubah");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengubah");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengubah");
    }
  },
  input: async (req, res) => {
    try {
      const body = req.body;
      const {
        nama,
        email,
        password,
        role,
        jenisKelamin,
        agama,
        tanggalLahir,
        alamat,
        ktp,
        noHp,
      } = body;
      const getEmail = await authModel.getDataEmail(email);
      if (getEmail.length !== 0) {
        throw new Error("Email Telah Digunakan!");
      }
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "Gagal Hash Kata Sandi"); // tampilan jika err
        }

        const token = getToken();

        const id = uuidv4();

        const send = await sendEmail(email, token, nama, id);
        console.log(send);
        if (send) {
          penggunaModel
            .input({
              id,
              nama,
              email,
              password: hash,
              role,
              dibuat: date(),
              diupdate: date(),
              jenisKelamin,
              agama,
              tanggalLahir,
              alamat,
              token,
              ktp,
              noHp,
            })
            .then((result) => {
              success(
                res,
                { ...result, id },
                "success",
                "Berhasil Menambahkan Pengguna"
              );
            })
            .catch((err) => {
              failed(res, err.message, "failed", "Gagal Menambahkan Pengguna");
            });
        } else {
          console.log(send);

          failed(
            res,
            "Gagal Kirim Email",
            "failed",
            "Gagal Menambahkan Pengguna"
          );
        }
      });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Input Data");
    }
  },
  deletePengguna: async (req, res) => {
    try {
      const id = req.params.id;

      console.log(id);
      penggunaModel
        .deletePengguna(id)
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Hapus Pengguna");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Hapus Pengguna");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Hapus Pengguna");
    }
  },
};
