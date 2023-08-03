const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' });

/**
 * 创建 Nodemailer 传输器
 * @returns {Object} Nodemailer 传输器
 */
function createTransporter() {
  const username = process.env.MAIL_USER;
  const password = process.env.MAIL_PASS;

  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password
    }
  });

  return transporter;
}

/**
 * 发送电子邮件
 * @param {Object} mailOptions - 邮件选项，包括 from, to, subject, text 等属性
 * @returns {Promise} - 返回一个 Promise 对象，表示邮件发送的结果
 */
function sendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    const transporter = createTransporter();

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = {
  sendMail
};