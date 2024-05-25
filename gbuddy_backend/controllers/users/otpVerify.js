const otpSchema = require('../../models/opt/otpSchema');

const otpVerify = async (req , res) => {
    try{
        const data = await otpSchema.findOne({"email" : req.query.email , "otp" : req.query.otp});
        if(!data)
        {
            res.status(200).send("Invalid OTP");
            console.log("Invalid OTP" , data);
            return;
        }

        else{
        res.status(200).send(data);
        console.log("OTP Verified Successfully", data);
        
        }
    }
    catch(error){
        res.status(400).send(error?.message);
    }
}

exports.otpVerify = otpVerify;