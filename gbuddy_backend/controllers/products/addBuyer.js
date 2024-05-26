const productsSchema = require('../../models/productSchema');
exports.updateBuyerId = async(req , res) =>{
    const {id,buyerId} = req.body;
    try{
        console.log(id);
        const product=await productsSchema.findById(id);
        product.buyerId=buyerId;
        await product.save();
        res.status(200).send(product);
    }
    catch(error){
        res.status(400).send(error);
    }
}