const express = require('express');
const cors = require('cors');
const connection = require('./dbconnection');
require('dotenv').config();
const userRoutes = require('./routes/userRoute');
const authRoutes = require("./routes/auth");

connection();
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/authRoutes", authRoutes);
app.use('/api/signup', require('./routes/userRoute'));

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
});


//Generates a token, then sends an email to the users email account
app.post('/forgot-password', (req, res) => {
    const {email} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'your password'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'user email@gmail.com',
            subject: 'Reset Password Link',
            text: `http://localhost:5173/reset_password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
})


//the user is asked to create a new password which is sent back to the database
app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})