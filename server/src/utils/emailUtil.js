const nodemailer = require('nodemailer');

async function sendMail(email, name, path) {
  var mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "biopythonemail@gmail.com",
      pass: "sgxxvufmpbzekoxq"
    }
  })


  switch (path) {
    case "patient":
      var details = {
        from: "Tur1ng <biopythonemail@gmail.com>",
        to: email,
        subject: "Welcome to Tur1ng",
        text: "Testing first Sender",
        html: `<!DOCTYPE html>
                <html>
                <head>
                <meta charset="UTF-8">
                <title>Welcome to Vitals!</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                    }
                
                    .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    }
                
                    h1 {
                    color: #1565C0;
                    }
                
                    p {
                    color: #555555;
                    line-height: 1.5;
                    }
                
                    .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #2196F3;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    }
                </style>
                </head>
                <body>
                <div class="container">
                    <h1>Welcome to Vitals!</h1>
                    <p>Dear ${name} ,</p>
                    <p>Thank you for joining Tur1ng. We're excited to have you as a new user and assist you in managing your health information effectively.</p>
                    <p>Tur1ng provides a secure and convenient way to store and access your health records, track vital signs, schedule appointments, and receive important updates from healthcare professionals.</p>
                    <p>To get started, simply download our app from the App Store or Google Play Store and sign in with your account credentials. If you haven't created an account yet, you can easily register within the app.</p>
                    <p>If you have any questions or need assistance, our support team is always ready to help. Just reach out to us via email at support@vitalsapp.com or give us a call at +234 818 198 2061.</p>
                    <p>Once again, welcome to Tur1ng! We look forward to being your trusted partner in managing your health.</p>
                    <p>Best regards,</p>
                    <p>The Tur1ng Team</p>
                    <br>
                    <p><a class="button" href="https://vitalz.vercel.app/">Visit our website</a></p>
                </div>
                </body>
                </html>`
      }
      break;

  }

  mailTransport.sendMail(details, (err) => {
    if (err) {
      res.status(401).json({ success: false, message: error.message })
    } else {
      console.log("email has been sent!")
    }
  })
}

module.exports = { sendMail }


