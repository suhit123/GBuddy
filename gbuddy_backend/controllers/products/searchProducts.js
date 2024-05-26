const productsSchema = require('../../models/productSchema');
exports.searchProducts = async(req , res) =>{
    try{
        const {query}=req.query;
        const products=await productsSchema.find({
            $or: [
              { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
              { description: { $regex: query, $options: 'i' } },
          ],
          });
        console.log(products)
        res.status(200).send(products);
    }
    catch(error){
        res.status(400).send(error);
    }
}