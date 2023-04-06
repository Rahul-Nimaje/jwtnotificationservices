const nodemailer = require("nodemailer");
const config = require("./authenticationconfig");
// const user = config.user;
// const pass = config.pass;
console.log("env........", process.env.EMAIL_ID, config.user, config.pass, process.env.PASS);
const user = process.env.EMAIL_ID;
const pass = process.env.PASS;
const transport = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass,
    },
});
module.exports.sendConfirmationEmail = (name, email) => {
    console.log("Check...............", email, name, user);
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://crm.frendy.com:2022/confirm?email=${email}> Click here</a>
        </div>`,
    }).catch(err => console.log(err));
};