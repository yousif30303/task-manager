const nodemailer  = require('nodemailer')
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yousif30303@gmail.com',
      pass: 'd,st28271220'
    }
  });

  var mailOptions = {
    from: 'yousif30303@gmail.com',
    to: '',
    subject: '',
    text: ''
  };
  

  const sendWelcomEmail = (email, name) =>{
    mailOptions.to = email
    mailOptions.subject = 'thanks for join in'
    mailOptions.text = 'welcom to the app '+ name +'!'
    transporter.sendMail(mailOptions);
  }

  const sendCancelEmail = (email, name)=>{
    mailOptions.to = email
    mailOptions.subject = 'sorry to see go'
    mailOptions.text = 'we sorry about leaving us '+ name +',have a great life!'
    transporter.sendMail(mailOptions);
  }

  module.exports = {
    sendWelcomEmail,
    sendCancelEmail
  }

