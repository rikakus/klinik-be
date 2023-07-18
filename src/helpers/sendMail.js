const nodemailer = require("../config/nodemailer");

const sendEmail = async (toEmail, token, name, id) => {
  const data = await nodemailer
    .sendMail({
      from: `Klinik Asna <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Verifikasi Email",
      attachments: [],
      html: `
      <body>
  <h2>Verifikasi Email</h2>
  <p>Halo,</p>
  <p>Yang Terhormat ${name} Terima kasih telah mendaftar di layanan kami. Untuk melengkapi proses pendaftaran, kami memerlukan verifikasi email Anda.</p>
  <p>Berikut adalah kode verifikasi Anda:</p>
  <h1>${token}</h1>
  <p>Silakan masukkan token-token di atas dalam website kami.</p>
    <p>atau dengan klik link berikut <a href="${process.env.LINK_WEBSITE}aktivasi?token=${token}&id=${id}">kembali ke website</a></p>
  <p>Jika Anda tidak meminta verifikasi ini, silakan abaikan email ini.</p>
  <p>Terima kasih,<br>Tim Layanan Kami</p>
</body>
      `,
    })
    .then((result) => {
      console.log("Nodemailer success");
      return true;
    })
    .catch((err) => {
      console.log(`Nodemailer Error : ${err}`);
      return false;
    });
  return data;
};
module.exports = sendEmail;
