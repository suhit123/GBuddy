const productsSchema = require('../../models/productSchema');
exports.editProductbyID = async(req , res) =>{
    const id = req.params.id;
    try{
        await productsSchema.findByIdAndUpdate(id,req.body);
        res.status(200).send("Edited Successfully");
    }
    catch(error){
        res.status(400).send(error);
    }
}