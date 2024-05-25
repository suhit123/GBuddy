const productsSchema = require('../../models/productSchema');
exports.getProductbyID = async(req , res) =>{
    const id = req.params.id;
    try{
        const product=await productsSchema.find(id);
        console.log(product)
        res.status(200).send(product);
    }
    catch(error){
        res.status(400).send(error);
    }
}