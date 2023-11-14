const mongoose = require('mongoose');
const purchaseSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'products',
    required: [true, 'product id required'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: [true, 'user id required'],
  },
  price: {
    type: Number,
    required: [true, 'Price required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const purchases = mongoose.model('purchases', purchaseSchema);
module.exports = purchases;
