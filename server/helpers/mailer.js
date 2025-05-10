const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

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
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetLink = `http://localhost:5173/auth/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: '"Your App" <no-reply@yourapp.com>',
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333;">Reset your password</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to set a new password. This link will expire in 1 hour.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <p style="color: #888;">— Your App Team</p>
      </div>
    `,
  });
};
module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
