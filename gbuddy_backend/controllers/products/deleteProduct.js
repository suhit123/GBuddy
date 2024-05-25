const productsSchema = require('../../models/productSchema');
exports.deleteProductbyID = async(req , res) =>{
    const id = req.params.id;
    try{
        await productsSchema.findByIdAndDelete(id);
        res.status(200).send("Deleted Successfully");
    }
    catch(error){
        res.status(400).send(error);
    }
}