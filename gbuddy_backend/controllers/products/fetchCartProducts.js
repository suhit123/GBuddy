const userSchema = require('../../models/user/userSchema');
const productsSchema = require('../../models/productSchema');

const jwt = require('jsonwebtoken');
exports.fetchCartItems=async(req,res)=>{
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, "secretkey");
        const user = await userSchema.findById(decoded.id);
        const cart = user.cart;
        const response = await Promise.all(cart.map(async (id) => {
            const product = await productsSchema.findById(id);
            return product;
        }));
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send(error);
    }
}