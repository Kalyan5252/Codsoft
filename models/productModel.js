const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product must require a name'],
      unique: false,
      trim: true,
      maxlength: [
        40,
        'A product name must have less or equal then 40 characters',
      ],
    },
    slug: String,
    description: {
      type: String,
      required: [false, ''],
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    power: {
      type: String,
      required: [true, 'stats required'],
    },
    year: {
      type: Number,
      required: [true, 'stats required'],
    },
    config: {
      type: String,
    },
    channel: {
      type: String,
    },

    images: [String],
    imageCover: {
      type: String,
      required: [true, 'A Product must have a cover image'],
    },
    connectivity: {
      type: String,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product requires price'],
    },
    details: [
      {
        type: String,
      },
    ],
    // reviews: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Review",
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.index({ slug: 1 });

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre('save', function (next) {
  // console.log(this);
  this.slug = slugify(this.productName, { lower: true });
  next();
});

const products = mongoose.model('products', productSchema);

module.exports = products;
