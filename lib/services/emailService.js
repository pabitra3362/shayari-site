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
