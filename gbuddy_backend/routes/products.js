
const express = require("express");
const multer = require('multer');
const { addToCart } = require('../controllers/products/addToCart');
const { addProduct } = require("../controllers/products/addProduct");
const { getProductbyID } = require("../controllers/products/getProductById");
const { fetchProducts } = require("../controllers/products/fetchProducts");
const { deleteProductbyID } = require("../controllers/products/deleteProduct");
const { editProductbyID } = require("../controllers/products/editProduct");
const { searchProducts } = require("../controllers/products/searchProducts");
const { fetchCartItems } = require("../controllers/products/fetchCartProducts");
const { removeFromCart } = require("../controllers/products/removeFromCart");
const { updateBuyerId } = require("../controllers/products/addBuyer");
const upload = multer({ dest: 'uploads/' });
const routes = express.Router();
routes.post('/addProduct',addProduct)
.get('/get',getProductbyID)
.get('/fetchProducts',fetchProducts)
.get('/search',searchProducts)
.delete("/delete/:id", deleteProductbyID)
.patch("/edit", editProductbyID)
.post("/addToCart",addToCart)
.post("/removeFromCart",removeFromCart)
.post("/fetchCart",fetchCartItems)
.post("/updateBuyerId",updateBuyerId)
exports.route = routes;
