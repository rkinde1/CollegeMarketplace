const express = require('express');
const cors = require('cors');
const connection = require('./dbconnection');
const nodemailer = require('nodemailer');

connection();
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/signup', require('./routes/userRoute'));
app.use('/api/login', require('./routes/loginRoute'));

// Create a transporter to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mburton1127@gmail.com',
    pass: 'moou ewyr vjcp ppsh',
  },
});

// Create a route to handle forgot password requests
app.post('/forgot-password', async (req, res) => {
  // Get the user's email address
  const email = req.body.email;

  // Send an email with the reset token
  const emailOptions = {
    from: 'mburton1127@gmail.com',
    to: email,
    subject: 'Reset your password',
    text: `To reset your password, please click on the following link:

${req.protocol}://${req.hostname}:3000/reset-password/${resetToken}
`,
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error sending email');
    } else {
      res.status(200).send('Email sent successfully');
    }
  });
});

// Create a route to handle reset password requests
app.post('/reset-password', async (req, res) => {
  // Get the reset token
  const resetToken = req.body.resetToken;

  // Get the new password
  const newPassword = req.body.newPassword;

  // Validate the reset token
  // ...

  // Update the user's password in the database
  // ...

  // Send a success email to the user
  const emailOptions = {
    from: 'mburton1127@gmail.com',
    to: email,
    subject: 'Your password has been reset',
    text: `Your password has been successfully reset. Please log in with your new password.`,
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error sending email');
    } else {
      res.status(200).send('Password reset successfully');
    }
  });
});

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
});
