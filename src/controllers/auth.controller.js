const { success, failed } = require("../helpers/response");
const authModel = require("../models/auth.model");
const { v4: uuidv4 } = require("uuid");
const { moment } = require("moment");
const date = require("../helpers/date");
const sendEmail = require("../helpers/sendMail");
const bcrypt = require("bcrypt");
const sendEmailPassword = require("../helpers/sendPassword");

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
  login: async (req, res) => {
    try {
      const body = req.body;
      const { email, password } = body;
      authModel
        .getDataEmail(email)
        .then((result) => {
          if (result.length === 0) {
            throw new Error("Email atau Kata Sandi Salah");
          } else if (result[0].token.toString().length === 6) {
            throw new Error(
              "Akun anda belum aktif silahkan aktifkan akun anda"
            );
          } else {
            bcrypt.compare(password, result[0].password).then(async (match) => {
              if (match) {
                const {
                  nama,
                  email,
                  password,
                  role,
                  dibuat,
                  diupdate,
                  id,
                  jenis_kelamin,
                  agama,
                  tanggal_lahir,
                  alamat,
                  token,
                  ktp,
                  no_hp,
                } = result[0];
                const tokenData = {
                  nama,
                  email,
                  password,
                  role,
                  dibuat,
                  diupdate,
                  id,
                  jenisKelamin: jenis_kelamin,
                  agama,
                  tanggalLahir: tanggal_lahir,
                  alamat,
                  token,
                  ktp,
                  noHp: no_hp,
                };
                // const token = await jwtToken(tokenData);
                success(res, tokenData, "success", "Berhasil Masuk");
              } else {
                failed(
                  res,
                  "Email atau Kata Sandi Salah",
                  "failed",
                  "Gagal Masuk"
                );
              }
            });
          }
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Masuk");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Masuk");
    }
  },
  register: async (req, res) => {
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
          authModel
            .inputUsers({
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
              success(res, { ...result, id }, "success", "Berhasil Mendaftar");
            })
            .catch((err) => {
              failed(res, err.message, "failed", "Gagal Mendaftar");
            });
        } else {
          console.log(send);

          failed(res, "Gagal Kirim Email", "failed", "Gagal Mendaftar");
        }
      });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Memasukan Data");
    }
  },
  aktivasi: async (req, res) => {
    try {
      const body = req.body;
      const { token, id } = body;
      authModel
        .detailusers(id)
        .then((result) => {
          if (result[0].token.toString() !== token) {
            throw new Error("Token Salah");
          } else {
            authModel
              .updateToken({
                id,
                token: null,
                date: date(),
              })
              .then((result) => {
                success(res, { ...result, id }, "success", "Berhasil Aktivasi");
              })
              .catch((err) => {
                failed(res, err.message, "failed", "Gagal Aktivasi");
              });
          }
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Aktivasi");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Aktivasi");
    }
  },
  getToken: async (req, res) => {
    try {
      const body = req.body;
      const { id } = body;

      authModel
        .detailusers(id)
        .then(async (result) => {
          if (result.length === 0) {
            throw new Error("Akun Tidak Ditemukan");
          } else {
            const token = getToken();

            const send = await sendEmail(
              result[0].email,
              token,
              result[0].nama,
              id
            );
            if (send) {
              authModel
                .updateToken({
                  id,
                  token,
                  date: date(),
                })
                .then((result) => {
                  success(
                    res,
                    { ...result, id },
                    "success",
                    "Berhasil Mendapatkan Token"
                  );
                })
                .catch((err) => {
                  failed(res, err.message, "failed", "Gagal Mendapatkan Token");
                });
            } else {
              failed(
                res,
                "Gagal Kirim Email",
                "failed",
                "Gagal Mendapatkan Token"
              );
            }
          }
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Token");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Token");
    }
  },
  getTokenEmail: async (req, res) => {
    try {
      const body = req.body;
      const { email } = body;

      authModel
        .getDataEmail(email)
        .then(async (result) => {
          if (result.length === 0) {
            throw new Error("Akun Tidak Ditemukan");
          } else {
            const token = getToken();
            const id = result[0].id;

            const send = await sendEmailPassword(
              result[0].email,
              token,
              result[0].nama,
              id
            );
            if (send) {
              authModel
                .updateToken({
                  id,
                  token,
                  date: date(),
                })
                .then((ress) => {
                  success(
                    res,
                    { result },
                    "success",
                    "Berhasil Mendapatkan Token"
                  );
                })
                .catch((err) => {
                  failed(res, err.message, "failed", "Gagal Mendapatkan Token");
                });
            } else {
              failed(
                res,
                "Gagal Kirim Email",
                "failed",
                "Gagal Mendapatkan Token"
              );
            }
          }
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Token");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Token");
    }
  },
  changePassword: async (req, res) => {
    try {
      const body = req.body;
      const { id, password, token } = body;
      const getEmail = await authModel.detailusers(id);
      console.log(id, password, token);
      if (getEmail.length === 0) {
        throw new Error("Akun Tidak Ditemukan");
      } else if (getEmail[0].token.toString() !== token) {
        throw new Error("Token Salah");
      } else {
        bcrypt.compare(password, getEmail[0].password).then(async (match) => {
          if (match) {
            failed(
              res,
              "Kata Sandi Tidak Boleh Sama",
              "failed",
              "Gagal Ubah Kata Sandi"
            );
          } else {
            bcrypt.hash(password, 10, async (err, hash) => {
              if (err) {
                failed(res, err.message, "failed", "Gagal Hash Kata Sandi"); // tampilan jika err
              }
              authModel
                .updatePassword({
                  id,
                  password: hash,
                  date: date(),
                  token: null,
                })
                .then((result) => {
                  success(
                    res,
                    { ...result, id },
                    "success",
                    "Berhasil Ubah Kata Sandi"
                  );
                })
                .catch((err) => {
                  failed(res, err.message, "failed", "Gagal Ubah Kata Sandi");
                });
            });
          }
        });
      }
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Ubah Kata Sandi");
    }
  },
};
