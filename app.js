const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const productsRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/usersRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const purchaseRouter = require('./routes/purchaseRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controllers/errorController');
const appError = require('./utility/AppError');

const cookieParser = require('cookie-parser');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`));

// app.use(helmet());

// app.use(mongoSanitize());

// app.use(xss());
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price',
//     ],
//   })
// );
// app.use("/", viewRouter);
app.use('/', viewRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/purchases', purchaseRouter);

app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
