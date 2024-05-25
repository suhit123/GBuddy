const addProduct=require('../controllers/products/addProduct')
const getProductById=require('../controllers/products/getProductById');
const editProduct=require('../controllers/products/editProduct');
const deleteProduct=require('../controllers/products/deleteProduct');
const fetchProducts=require('../controllers/products/fetchProducts');
const express = require("express");
const multer = require('multer');
const searchProducts  = require('../controllers/products/searchProducts');
const upload = multer({ dest: 'uploads/' });
const routes = express.Router();
routes.post('/addProduct',addProduct.addProduct)
.get('/get',getProductById.getProductbyID)
.get('/fetchProducts',fetchProducts.fetchProducts)
.get('/search',searchProducts.searchProducts)
.delete("/delete/:id", deleteProduct.deleteProductbyID)
.patch("/edit", editProduct.editProductbyID);
exports.route = routes;
