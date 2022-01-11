const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');
console.log(process.env.NODE_ENV);

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.firstName = user.name.split(' ')[0];
    this.from = `Domenico Cucinotta <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV.trim() === 'production') {
      console.log('PROCESS PASSED!!!!!!');
      //Sendgrid
      return nodemailer.createTransport({
        // service: 'SendGrid',
        // from: process.env.SENDGRID_EMAIL_FROM,
        // auth: {
        //   user: process.env.SENDGRID_USERNAME,
        //   pass: process.env.SENDGRID_PASSWORD,
        // },
        host: process.env.SENDGRID_HOST,
        port: process.env.SENDGRID_PORT,
        from: process.env.SENDGRID_EMAIL_FROM,
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    //Mailtrap
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    //send the actual email
    // 1) Render HTML based on pug template

    const html = pug.renderFile(
      `${__dirname}/../../views/email/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    //2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText(html),
      html,
    };
    //3) create a transport and send

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family');
  }

  async sendResetPassword() {
    await this.send(
      'resetPassword',
      `'Your password reset token (valid for only 10 minutes)'!`
    );
  }
};
