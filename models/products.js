const mongoose = require('mongoose')
const Schema = mongoose.Schema
const product = new Schema({
  title: String,
  category: String,
  quantity: Number,
  desc: String,
  porductimages: String
})

module.exports = mongoose.model('products', product)