const userSchema = require('../../models/user/userSchema');
const bycrypt = require('bcrypt');

const changePassword = async (req, res) => {
    try {
        const data = await userSchema.findOne({"email": req.query.email});
        if (!data) {
            console.log("User not found");
            res.status(404).send("User not found");
            return;
        }
        const isMatch = await bycrypt.compare(req.query.oldpassword, data.password);
        console.log(data.password);
        console.log(isMatch);
        if (!isMatch) {
            console.log("Enter Correct Password");
            res.status(404).send("Invalid Credentials");
            return;
        }
        const newHashedData = await bycrypt.hash(req.query.newpassword, 10);
        data.password = newHashedData;
        await data.save();
        res.status(200).send(data);
        console.log("Password Recovered Successfully", data);

    } catch (error) {
        res.status(400).send(error?.message)
    }

};

exports.changePassword = changePassword;