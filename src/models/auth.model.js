const db = require("../config/db");

const usersModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM pengguna`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  inputUsers: (data) => {
    return new Promise((resolve, reject) => {
      const {
        nama,
        email,
        password,
        role,
        dibuat,
        diupdate,
        id,
        jenisKelamin,
        agama,
        tanggalLahir,
        alamat,
        token,
        ktp,
        noHp,
      } = data;
      console.log(data);
      db.query(
        `INSERT INTO pengguna (nama, email, password, role, dibuat, diupdate, id, jenis_kelamin, agama, tanggal_lahir, alamat, token, ktp, no_hp) VALUES ('${nama}','${email}','${password}','${role}','${dibuat}','${diupdate}','${id}','${jenisKelamin}','${agama}','${tanggalLahir}','${alamat}','${token}','${ktp}','${noHp}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateusers: (data) => {
    return new Promise((resolve, reject) => {
      const { id, nama, email, pass, role, updated } = data;
      db.query(
        `UPDATE users SET username='${nama}', email='${email}',password='${pass}'
          , role='${role}', updated='${updated}' WHERE id='${id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  getDataNama: (nama) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM pengguna WHERE nama='${nama}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  getDataEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM pengguna WHERE email='${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  listAll: (search, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM pengguna WHERE nama LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  detailusers: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM pengguna WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  deleteusers: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM pengguna WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  updateToken: (data) => {
    return new Promise((resolve, reject) => {
      const { token, id, date } = data;
      db.query(
        `UPDATE pengguna SET token='${token}',diupdate='${date}'WHERE id='${id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updatePassword: (data) => {
    return new Promise((resolve, reject) => {
      const { password, token, id, date } = data;
      db.query(
        `UPDATE pengguna SET token='${token}',password='${password}',diupdate='${date}'WHERE id='${id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = usersModel;
