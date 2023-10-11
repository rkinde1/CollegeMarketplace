const {createMailTransponder} = require("./creatMailtransponder");

const sendVerificationMail = (user) =>{
    const transponder = createMailTransponder();

    const mailOptions = {
        from: '"College Marketplace" <cbrown114@students.towson.edu',
        to: user.email,
        subject: "Verify your Email",
        html: `<p>Hello ${user.name}, verify your email by clicking this link</p>
        <a href = '${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}'>Verify your
        Email</a>
        `,
    };

    WebTransportError.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
        } else {
            console.log("Verification email sent");
        }
    });
};

module.exports = {sendVerificationMail};