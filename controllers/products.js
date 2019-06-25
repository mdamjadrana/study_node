const Product = require('../models/products')
const Resize = require('../resize');
const path = require('path')

module.exports.addProduct = async (req, res, next) => {
  const createProduct = new Product(req.body)
  const newProduct = await createProduct.save()
  res.json(newProduct);
  res.redirect('/products/1')
}

module.exports.getProducts = async (req, res) => {
  let perPage = 2
  let page = req.params.page || 1
  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.render('pages/products/products', {
          products: products,
          current: page,
          pages: Math.ceil(count / perPage),
          page: 'Registration',
          menuId: 'registration'
        })
      })
    })
  // res.json(allProducts)
}

module.exports.product = (req, res) => {
  const _id = req.params._id;
  Product
    .findById({_id})
    .exec((err, product) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.render('pages/products/single', {
          product: product,
          page: 'Product Details',
          menuId: 'registration',
          newStylesheet: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css',
          newJSlink: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js'
        })
      })
    })
}