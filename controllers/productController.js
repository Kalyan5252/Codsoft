const Product = require('./../models/productModel');
const crudFactory = require('./crudFactory');
const catchAsync = require('./../utility/catchAsync');
const appError = require('./../utility/AppError');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new appError('Upload only image files', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);

exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  if (!req.files.imageCover || !req.files.images) return next();

  req.body.imageCover = `product-${
    req.params.productId
  }-${Date.now()}-cover.png`;

  await sharp(req.files.imageCover[0].buffer)
    .resize(650, 650)
    .toFormat('png')
    .jpeg({ quality: 90 })
    .toFile(`public/images/products/${req.body.imageCover}`);

  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${req.params.productId}-${Date.now()}-${
        i + 1
      }.jpeg`;
      await sharp(file.buffer)
        .resize(800, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${filename}`);
      req.body.images.push(filename);
    })
  );

  next();
});

exports.getAllProducts = crudFactory.getAll(Product);
exports.getProduct = crudFactory.getOne(Product, 'reviews');
exports.updateProduct = crudFactory.updateOne(Product);
exports.addProduct = crudFactory.createOne(Product);
exports.deleteProduct = crudFactory.deleteOne(Product);

// exports.getProduct = catchAsync(async (req, res, next) => {
//   const product = await Product.findById(req.params.id).populate("reviews");
//   if (!product) {
//     return next(new appError("Product not found", 404));
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       product,
//     },
//   });
// });
