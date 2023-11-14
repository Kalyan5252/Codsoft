const express = require('express');
const authController = require('./../controllers/authController');
const purchaseController = require('./../controllers/purchaseController');

const router = express.Router();

// router.use(authController.protect);s
router.get(
  '/checkout-session/:productId',
  authController.protect,
  purchaseController.assignStripe,
  purchaseController.getCheckout
);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(purchaseController.getAllPurchase)
  .post(purchaseController.createPurchase);
router
  .route('/:id')
  .get(purchaseController.getPurchase)
  .delete(purchaseController.deletePurchase)
  .patch(purchaseController.updatePurchase);

module.exports = router;
