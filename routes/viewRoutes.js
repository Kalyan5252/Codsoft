const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const purchaseController = require('./../controllers/purchaseController');

router.get('/login', viewController.login);

router.get('/signup', viewController.signup);
router.get('/support', viewController.support);
router.get(
  '/',
  purchaseController.createOrderCheckout,
  authController.loggedIn,
  viewController.getHome
);
router.get('/profile', authController.loggedIn, viewController.profile);
router.get(
  '/profile/manageProducts',
  authController.loggedIn,
  viewController.manageProducts
);

router.get('/shop', authController.loggedIn, viewController.getShopo);
router.get(
  '/shop/:product',
  authController.loggedIn,
  viewController.getProduct
);
// router.get("/shopo", viewController.getShopo);

module.exports = router;
