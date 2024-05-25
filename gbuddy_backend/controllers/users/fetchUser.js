const userSchema = require('../../models/user/userSchema');
const jwt = require('jsonwebtoken');

const fetchUser = async (req, res) => {
    try {
        const token = req.query.token;
        const decoded = jwt.verify(token, "secretkey");
        
        const user = await userSchema.findById(decoded.id);
        res.status(200).json(user);
        console.log("User Fetched Successfully", user);

    }
    catch (error) {
        res.status(200).json("User Not found.");
    }
}
exports.fetchUser = fetchUser;
