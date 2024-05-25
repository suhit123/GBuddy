const usersSchema = require('../../models/user/userSchema');

const existingUser = async (req, res) => {

const mail = await usersSchema.findOne({ "email" : req.query.email });
if (mail) {
    res.status(200).send("User already exists");
    console.log("User already exists", mail);
    return;
}
else {
    res.status(200).send("User does not exist");
    console.log("User does not exist", mail);
}
};

exports.existingUser = existingUser;