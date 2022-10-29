/* export default function (req, res) {
  require("dotenv").config();
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "nd.corc@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
    secure: true,
  });
  const mailData = {
    from: "demo email",
    to: "your email",
    subject: `Message From asdf`,
    text: "asdfa;lkajsdfljaqsd;fjlka;lksdjf;laksdjf",
    html: `<div>${"asdfa;lkajsdfljaqsd;fjlka;lksdjf;laksdjf"}</div><p>Sent from:
    nd.corc@gmail.com</p>`,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.status(200);
}
 */
