
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
const upload = multer({ dest: 'uploads/' });
const routes = express.Router();
routes.post('/addProduct',addProduct)
.get('/get',getProductbyID)
.get('/fetchProducts',fetchProducts)
.get('/search',searchProducts)
.delete("/delete/:id", deleteProductbyID)
.patch("/edit", editProductbyID)
.post("/addToCart",addToCart)
.post("/fetchCart",fetchCartItems)
exports.route = routes;
