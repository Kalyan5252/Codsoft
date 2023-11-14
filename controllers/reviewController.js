const Review = require('./../models/reviewModel');
const crudfactory = require('./crudFactory');
const Product = require('./../models/productModel');
const catchAsync = require('./../utility/catchAsync');

exports.setProductUserIds = catchAsync(async (req, res, next) => {
  // Allow nested routes
  // console.log(req.originalUrl);
  console.log(req.body.slug);
  const product = await Product.findOne({ slug: req.body.slug });
  if (!req.body.product) req.body.product = product.id;

  if (!req.body.user) req.body.user = req.user.id;
  // console.log(req.body);
  next();
});

exports.getAllReviews = crudfactory.getAll(Review);
exports.getReview = crudfactory.getOne(Review);
exports.createReview = crudfactory.createOne(Review);
exports.updateReview = crudfactory.updateOne(Review);
exports.deleteReview = crudfactory.deleteOne(Review);
