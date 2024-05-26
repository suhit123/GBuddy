const otpSchema = require('../../models/opt/otpSchema');
var nodemailer = require('nodemailer');

const sendOtp = async (req , res) => {
    
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mgowthamraj9491@gmail.com',
            pass: 'wtcm oqbw emff jsth'
        }
        });

        var mailOptions = {
        from: "mgowthamraj9491@gmail.com",
        to: req.body.email,
        subject: `Welcome to GITAM - BUDDY APP`,
        text: `Hello ${req.body.username} \n Your OTP is ${req.body.otp}`
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("error in sending mail", error?.message);
            
        } else {
            console.log('Email sent: ' + info.response);
        }
        });




    try{
        const data = await otpSchema.create({email : req.body.email , otp : req.body.otp});
        res.status(200).send(data);
        console.log("OTP Sent to DB Success", data);
    }
    catch(error){
        res.status(400).send(error?.message);
        console.log("Error in OTP sending to DB", error?.message);
    }
}

exports.sendOtp = sendOtp;