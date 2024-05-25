const addProduct=require('../controllers/products/addProduct')
const getProductById=require('../controllers/products/getProductById');
const editProduct=require('../controllers/products/editProduct');
const deleteProduct=require('../controllers/products/deleteProduct');

const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const routes = express.Router();
routes.post('/addProduct',addProduct.addProduct)
.get('/get',getProductById.getProductbyID)
.delete("/delete/:id", deleteProduct.deleteProductbyID)
.patch("/edit", editProduct.editProductbyID);
exports.route = routes;
