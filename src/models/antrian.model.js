const db = require("../config/db");

const antrianModel = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT  * FROM antrian ORDER BY estimasi DESC`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  getDataToday: (date) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT  * FROM antrian WHERE DATE(dibuat) = '${date}' ORDER BY estimasi DESC`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  getDataId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM antrian WHERE id_pengguna='${id}' ORDER BY estimasi DESC`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  addAntrian: (data) => {
    const {
      id,
      idPengguna,
      estimasi,
      antrian,
      sudahSelasai,
      dibuat,
      diupdate,
    } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO antrian (id, id_pengguna, estimasi, antrian, sudah_selasai, dibuat, diupdate) VALUES ('${id}','${idPengguna}','${estimasi}','${antrian}','${sudahSelasai}','${dibuat}','${diupdate}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  deleteAntrian: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM antrian WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = antrianModel;
