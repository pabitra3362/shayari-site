import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
});

export async function userRegisterEmailService({ email, username }) {
  const mailOptions = {
    from: `"Shayarspot" <${process.env.NODEMAILER_AUTH_USER}>`,
    to: email,
    subject: "Welcome to shayarspot ❤️❤️❤️",
    text: `Hi ${username},\n\nA warm welcome to our community! We're thrilled to have you on board. Your registration is now complete, and you're all set to explore our platform. If you have any questions or need assistance, feel free to reply to this email or reach out to our support team. We're always here to help. Best regards, The Team.`,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
}

export async function forgetPasswordEmailService({ email, name, id }) {
  const mailOptions = {
    from: `"Shayarspot" <${process.env.NODEMAILER_AUTH_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `Hi ${name},<br><br>You are receiving this email because you requested a password reset for your account.<br><br>To reset your password, please click on the following link or button: <br><br><a href="http://localhost:3000/pages/login/setNewPassword/${id}">http://localhost:3000/pages/login/setNewPassword/${id}</a><br><br><a href="http://localhost:3000/pages/login/setNewPassword/${id}"><button style="width: fit-content;background-color: #e38a53b0;color: black;font-size: larger;padding: 10px;border-radius: 7px; transition: all 500ms;" onmouseover="this.style.background='black'; this.style.color='yellow'" onmouseout="this.style.background='yellow'; this.style.color='black'">Reset Password</button></a><br><br>If you did not request this, please ignore this email and your password will remain unchanged.<br><br>Best regards, The Team.`,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
