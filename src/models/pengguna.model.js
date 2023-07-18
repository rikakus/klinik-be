const db = require("../config/db");

const penggunaModel = {
  getDokter: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT  * FROM pengguna WHERE role='1'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  getPasien: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM pengguna WHERE role='2'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  editPengguna: (data) => {
    const {
      nama,
      diupdate,
      id,
      jenisKelamin,
      agama,
      tanggalLahir,
      alamat,
      ktp,
      noHp,
    } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE pengguna SET nama='${nama}',diupdate='${diupdate}',jenis_kelamin='${jenisKelamin}',agama='${agama}',tanggal_lahir='${tanggalLahir}',alamat='${alamat}',ktp='${ktp}',no_hp='${noHp}' WHERE id='${id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  input: (data) => {
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
  deletePengguna: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM pengguna WHERE id='${id}' `, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = penggunaModel;
