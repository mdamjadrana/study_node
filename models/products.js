const mongoose = require('mongoose')
const Schema = mongoose.Schema
const product = new Schema({
  title: {
    type: String,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    lowercase: true,
    trim: true
  },
  quantity: Number,
  desc: String,
  porductimages: String
})

module.exports = mongoose.model('products', product)