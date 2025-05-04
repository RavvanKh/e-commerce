const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls:{
    rejectUnauthorized:false

  }
});

console.log(process.env.EMAIL_USERNAME,)

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const verificationUrl = `http://localhost:5173/auth/verify-account?token=${verificationToken}`;

    const mailOptions = {
      from: `"E-Ticaret App"`,
      to: email,
      subject: "Email Doğrulama",
      html: `
        <h2>E-Ticaret Uygulamasına Hoş Geldiniz!</h2>
        <p>Hesabınızı aktif etmek için lütfen aşağıdaki bağlantıya tıklayın:</p>
        <a href="${verificationUrl}" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 10px 0;
        ">Emailimi Doğrula</a>
        <p>Ya da bu kodu kullanabilirsiniz: <strong>${verificationToken}</strong></p>
        <p>Bu bağlantı 1 saat sonra geçersiz olacaktır.</p>
        <p>Eğer bu işlemi siz yapmadıysanız, bu maili dikkate almayınız.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Doğrulama maili gönderildi: ${email}`);
    return true;
  } catch (error) {
    console.error("Mail gönderim hatası:", error);
    return false;
  }
};

const sendPasswordResetEmail = async (email, resetToken) => {
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
