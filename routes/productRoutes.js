const express = require('express');
const productController = require('./../controllers/productController');
const product = require('../models/productModel');
const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.addProduct);
router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    productController.uploadProductImages,
    productController.resizeImages,
    productController.updateProduct
  )
  .delete(productController.deleteProduct);
module.exports = router;
