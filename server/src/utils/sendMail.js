const nodeMailer = require('nodemailer');

 const sendMail = (mailReceiver, resetCode) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.YOUR_EMAIL,
            pass: process.env.PASSWORD
        }
    });
    
    send();
    
    async function send() {
        const result = await transporter.sendMail({
            from: process.env.YOUR_EMAIL,
            to: mailReceiver,
            subject: 'Your reset code',
            text: resetCode
        });
    
        console.log(JSON.stringify(result, null, 4));
    }
}

module.exports = {sendMail}