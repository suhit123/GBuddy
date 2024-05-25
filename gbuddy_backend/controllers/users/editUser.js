const userSchema = require('../../models/user/userSchema');
const editUser = async (req, res) => {
    try {
        const id = req.query.id;
        const user = await userSchema.findByIdAndUpdate(id, req.body);
        res.status(200).send(user);
        console.log("User Edited Successfully", user);
    }
    catch (error) {
        res.status(404).send("error in editing user", error?.message);
    }
};
exports.editUser = editUser;