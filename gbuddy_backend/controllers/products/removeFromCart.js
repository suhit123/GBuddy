const userSchema = require('../../models/user/userSchema');
const jwt = require('jsonwebtoken');
exports.removeFromCart=async(req,res)=>{
    try{
        const {token,productId}=req.body;
        const decoded = jwt.verify(token, "secretkey");
        const user = await userSchema.findById(decoded.id);
        user.cart=user.cart.filter((item)=>item!==productId);
        user.save();
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).send(error);
    }
}