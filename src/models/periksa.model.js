const db = require("../config/db");

const periksaModel = {
  periksa: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT
r.id,
p1.nama AS nama,
r.keluhan,
r.nasihat,
r.diagnosa,
r.resep_dokter AS resepDokter,
p2.nama AS namaDokter,
r.sudah_selesai AS sudahSelesai,
r.dibuat,
r.diupdate
FROM riwayat r
INNER JOIN pengguna p1 ON r.id_pengguna = p1.id
INNER JOIN pengguna p2 ON r.id_dokter = p2.id WHERE id_pengguna='${id}'
`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  periksaDokter: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT
  r.id,
  p1.nama AS nama,
  r.keluhan,
  r.nasihat,
  r.diagnosa,
  IFNULL(p2.nama, '') AS namaDokter,
  r.resep_dokter AS resepDokter,
  r.sudah_selesai AS sudahSelesai,
  r.dibuat,
  r.diupdate
FROM
  riwayat r
INNER JOIN
  pengguna p1 ON r.id_pengguna = p1.id
LEFT JOIN
  pengguna p2 ON r.id_dokter = p2.id;
`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  periksaDokterById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`
SELECT
r.id,
p1.nama AS nama,
r.keluhan,
r.nasihat,
r.diagnosa,
r.resep_dokter AS resepDokter,
p2.nama AS namaDokter,
r.sudah_selesai AS sudahSelesai,
r.dibuat,
r.diupdate
FROM riwayat r
INNER JOIN pengguna p1 ON r.id_pengguna = p1.id
INNER JOIN pengguna p2 ON r.id_dokter = p2.id WHERE id_dokter='${id}';
`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  addPeriksa: (data) => {
    const {
      id,
      idPengguna,
      keluhan,
      nasihat,
      diagnosa,
      resepDokter,
      idDokter,
      sudahSelesai,
      dibuat,
      diupdate,
    } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO riwayat(id, id_pengguna, keluhan, nasihat, diagnosa, resep_dokter, id_dokter, sudah_selesai, dibuat, diupdate) VALUES ('${id}','${idPengguna}','${keluhan}','${nasihat}','${diagnosa}','${resepDokter}','${idDokter}','${sudahSelesai}','${dibuat}','${diupdate}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  editPeriksa: (data) => {
    const {
      id,
      nasihat,
      diagnosa,
      resepDokter,
      idDokter,
      diupdate,
      sudahSelesai,
    } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE riwayat SET nasihat='${nasihat}',diagnosa='${diagnosa}',resep_dokter='${resepDokter}',id_dokter='${idDokter}',sudah_selesai='${sudahSelesai}',diupdate='${diupdate}' WHERE id='${id}'`,
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

module.exports = periksaModel;
