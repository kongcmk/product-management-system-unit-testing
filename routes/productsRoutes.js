const express = require('express');
const router = express.Router();
const product = require("../controllers/products.controllers.js");

//create api
router.get('/', product.getProducts);
router.get('/:id', product.getProduct);
router.post('/', product.addProduct); 
router.put('/:id', product.editProduct);
router.delete('/:id', product.deleteProduct);
module.exports = router;