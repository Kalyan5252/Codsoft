const Product = require('./../models/productModel');
const Purchase = require('./../models/purchaseModel');
const catchAsync = require('./../utility/catchAsync');
const appError = require('./../utility/AppError');
const crudFactory = require('./../controllers/crudFactory');
let stripe;
// async () => {
//   console.log(process.env.STRIPE_SECRET_KEY);
//   stripe = await stripe(process.env.STRIPE_SECRET_KEY);
// };
// exports.getCheckout = catchAsync(async (req, res, next) => {
//   const product = await Product.findById(req.params.productId);
//   console.log(req.user);
//   console.log(product.price);
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     success_url: `${req.protocol}://${req.get('host')}/?product=${
//       product.id
//     }&user=${req.user.id}&price=${product.price}`,
//     cancel_url: `${req.protocol}://${req.get('host')}/shop/${product.slug}`,
//     customer_email: req.user.email,
//     client_reference_id: req.params.productId,
//     line_items: [
//       {
//         price_data: {
//           currency: 'inr',
//           unit_amount: product.price,
//           product_data: {
//             name: product.productName,
//             description: product.description,
//             images: [
//               `${req.protocol}://${req.get('host')}/images/products/${
//                 product.imageCover
//               }`,
//             ],
//           },
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//   });
//   if (session)
//     res.status(200).json({
//       status: 'success',
//       session,
//     });
//   else
//     res.status(404).json({
//       status: 'fail',
//       data: 'session failure',
//     });
// });
exports.assignStripe = catchAsync(async (req, res, next) => {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  next();
});

exports.getCheckout = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  //   console.log('Tour ID:' + tour);
  // console.log('Tour Price' + tour.price * 80);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?product=${
      req.params.productId
    }&user=${req.user.id}&price=${product.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/shop/${product.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        price_data: {
          currency: 'inr',
          unit_amount: product.price * 100,
          product_data: {
            name: product.productName,
            description: product.description,
            // images: [`http://www.natours.dev/img/tours/${tour.imageCover}`],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });
  // if (session.id) res.redirect(303, session.url);
  // if (session.id)
  //   res.status(200).json({
  //     status: 'success',
  //     session,
  //   });
  // else
  res.status(200).json({
    status: 'success',
    session,
  });
});
exports.createOrderCheckout = catchAsync(async (req, res, next) => {
  const { product, user, price } = req.query;

  if (!product && !user && !price) return next();
  await Purchase.create({ product, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
  return next();
});

exports.getAllPurchase = crudFactory.getAll(Purchase);
exports.getPurchase = crudFactory.getOne(Purchase);
exports.createPurchase = crudFactory.createOne(Purchase);
exports.deletePurchase = crudFactory.deleteOne(Purchase);
exports.updatePurchase = crudFactory.updateOne(Purchase);
