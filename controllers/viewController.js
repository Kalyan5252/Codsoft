const Product = require('../models/productModel');
const User = require('../models/userModel');
// const AppError = require("../utility/appError");
const catchAsync = require('../utility/catchAsync');

exports.getHome = catchAsync(async (req, res) => {
  res.status(200).render('home', {
    title: 'Tsound| Home',
  });
});
exports.getShopo = catchAsync(async (req, res) => {
  const products = await Product.find();
  // console.log(products);
  res.status(200).render('shopo', {
    title: 'TSound| Shop ',
    products,
  });
});
// exports.getShop = catchAsync(async (req, res) => {
//   const products = await Product.find();
//   // console.log(products);
//   res.status(200).render("shop", {
//     title: "TSound| Shop ",
//     products,
//   });
// });
exports.getProduct = catchAsync(async (req, res) => {
  const slug = req.params.product;
  const product = await Product.findOne({ slug: slug }).populate('reviews');
  res.status(200).render('product', {
    title: `TSound|${product.productName}`,
    product,
  });
});

exports.login = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Tsound| Login',
  });
});

exports.profile = catchAsync(async (req, res) => {
  // console.log(req.user.role);
  res.status(200).render('profile', {
    title: `Profile | ${req.user.name}`,
  });
});
exports.signup = catchAsync(async (req, res) => {
  res.status(200).render('signup', {
    title: 'Tsound| Signup',
  });
});

exports.manageProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.status(200).render('manageProducts', {
    products,
    title: 'Tsound| manageProducts',
  });
});

exports.support = catchAsync(async (req, res) => {
  res.status(200).render('support');
});
