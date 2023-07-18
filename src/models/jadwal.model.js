const db = require("../config/db");

const jadwalModel = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT  * FROM jadwal`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  getDataId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM antrian WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  addJadwal: (data) => {
    const { id, idDokter, masuk, keluar, hadir, dibuat, diupdate } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO jadwal (id, id_dokter, masuk, keluar, hadir, dibuat, diupdate) VALUES ('${id}','${idDokter}','${masuk}','${keluar}','${hadir}','${dibuat}','${diupdate}') `,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  editJadwal: (data) => {
    const { id, idDokter, masuk, keluar, hadir, diupdate } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE jadwal SET id_dokter='${idDokter}',masuk='${masuk}',keluar='${keluar}',hadir='${hadir}',diupdate='${diupdate}' WHERE id='${id}' `,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  deleteJadwal: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM jadwal WHERE id='${id}' `, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = jadwalModel;
