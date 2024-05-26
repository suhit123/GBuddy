const userSchema = require('../../models/user/userSchema');
const jwt = require('jsonwebtoken');

exports.removeFromCart = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!token || !productId) {
            return res.status(400).json({ message: "Token and Product ID are required." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        const user = await userSchema.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        user.cart = user.cart.filter((item) => item.toString() !== productId);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: "Invalid token." });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Token has expired." });
        } else {
            res.status(500).json({ message: "Internal server error.", error: error.message });
        }
    }
}
