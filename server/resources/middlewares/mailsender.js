import mailer from 'nodemailer';

const transport = mailer.createTransport({
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  // service: 'Gmail',
  auth: {
    // user: 'thisdavejdemo@gmail.com',
    // pass: 'myGmailPassword',
    user: 'sunnolelectronics@gmail.com',
    pass: process.env.emailPassword,
  },
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
});
const sendMail = (mailOptions) => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') return;
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info);
  });
};
export default sendMail;
