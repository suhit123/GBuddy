const userSchema = require('../../models/user/userSchema');

const changePasswordDirect = async (req, res) => {
    try {
        const email = req.query.email;
        const user = await userSchema.findOne({ "email": req.query.email });
        if (!user) {
            console.log("User not found");
            res.status(404).send("User not found");
            return;
        }
        else{
            user.password = req.query.password;
            await user.save();
            res.status(200).send("Password Changed Successfully");
            console.log("Password Changed Successfully", user);
        }
    }
        catch (error) {
            res.status(400).send("something error "+error?.message)
        }
    };

exports.changePasswordDirect = changePasswordDirect;