const userSchema = require('../../models/user/userSchema');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userSchema.findOne({ email: email});

        if (!user) {
            
            res.status(404).json({error:"User not found"});
            return;
        }
        const isMatch = bycrypt.compare(password , user.password);

        if (!isMatch) {
            console.log("Invalid Credentials");
            res.status(404).json({error:"Invalid Credentials"});
            return;
        }
        const token = jwt.sign({ id: user._id }, "secretkey");
        res.status(200).json({ user, token });
        res.end();
 
    }
    catch (error) {
        res.status(404).json({"error in logging in": error?.message});

    }
};
exports.loginUser = loginUser;