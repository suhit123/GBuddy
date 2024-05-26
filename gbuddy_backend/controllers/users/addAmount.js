const userSchema = require('../../models/user/userSchema');
exports.addAmount = async (req, res) => {
    try {
        const { userId, amount ,commision} = req.body;
        console.log(userId, amount);
        const user = await userSchema.findById(userId);
        user.wallet += amount;
        await user.save();
        const admin = await userSchema.findOne({role: "admin"});
        admin.wallet += commision;
        await admin.save();
        res.status(200).json({
            message: "Amount added successfully",
        });
    }
    catch (error) {
        res.status(404).send("error in editing user", error?.message);
    }
};