const productSchema = require("../../models/productSchema");
exports.addProduct = async (req, res) => {
    try {
        await productSchema.create({
            title: req.body.title,
            images: [...req.body.images],
            description: req.body.description,
            price: req.body.price,
            sellerId: req.body.sellerId,
        });
        res.status(200).json(req.body);
    } catch (err) {
        res.status(500).json({
            message: "something gone wrong!"
        })
    }
}