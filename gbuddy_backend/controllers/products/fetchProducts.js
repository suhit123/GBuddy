const productsSchema = require('../../models/productSchema');
exports.fetchProducts = async(req , res) =>{
    try{
        const products=await productsSchema.find();
        console.log(products)
        res.status(200).send(products);
    }
    catch(error){
        res.status(400).send(error);
    }
}