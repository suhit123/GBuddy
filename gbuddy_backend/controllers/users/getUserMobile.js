const userSchema = require('../../models/user/userSchema');
const jwt = require('jsonwebtoken');

const getUserMobile = async (req, res) => {
    try {
        const id = req.query.id;
        const user = await userSchema.findById(id);
        console.log(user);
        res.status(200).json({phone: user.phone});
        console.log("User Fetched Successfully", user);

    }
    catch (error) {
        res.status(200).json("User Not found.");
    }
}
exports.getUserMobile = getUserMobile;
