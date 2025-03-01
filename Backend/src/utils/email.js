import nodemailer from 'nodemailer';
import pug from 'pug';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Email {
  constructor(user, url) {
    this.to = user.email || user;
    this.firstName = user.username;
    this.url = url;
    this.from = `Kandarp Vyas <kandarp7777@gmail.com>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 587,
      secure: false,
      auth: {
        user: '930888698701f02121ecec03da2bc761',
        pass: '995953dfb6f51664c33df6475a670ffa',
      },
    });
  }

  // Send the actual email
  async send(template, subject, data = {}) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      ...data,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      // text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendLoanRequest() {
    await this.send('loanRequest', 'Loan Request');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      `Your password reset token (valid for only 10 minutes)}`
    );
  }

  async sendVerificationEmail() {
    await this.send('verifyEmail', 'Welcome to the Digital ROSCA!');
  }
}

export { Email };
