const nodemailer = require("../config/nodemailer");

const sendEmailPassword = async (toEmail, token, name, id) => {
  const data = await nodemailer
    .sendMail({
      from: `Klinik Asna <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Ganti Kata Sandi",
      attachments: [],
      html: `
      <body>
  <h2>Verifikasi Email</h2>
  <p>Halo,</p>
  <p>Yang Terhormat ${name} Terima kasih telah menggunakan layanan kami. Untuk melakukan pergantian kata sandi, kami memerlukan verifikasi email Anda.</p>
  <p>Berikut adalah kode verifikasi Anda:</p>
  <h1>${token}</h1>
  <p>Silakan masukkan token-token di atas dalam website kami.</p>
    <p>atau dengan klik link berikut <a href="${process.env.LINK_WEBSITE}password?token=${token}&id=${id}&email=${toEmail}">kembali ke website</a></p>
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
module.exports = sendEmailPassword;
