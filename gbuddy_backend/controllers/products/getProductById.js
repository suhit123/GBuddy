const productsSchema = require('../../models/productSchema');
exports.getProductbyID = async(req , res) =>{
    const id = req.query.id;
    try{
        console.log(id);
        const product=await productsSchema.findById(id);
        res.status(200).send(product);
    }
    catch(error){
        res.status(400).send(error);
    }
}