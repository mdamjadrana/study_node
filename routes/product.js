const Route = require('express').Router()
const {getProducts, addProduct, product} = require('../controllers/products')
const upload = require('../uploadMiddleware')

Route.get('/add', (req,res, next) => {
  res.render('pages/products/addProduct', {page: 'Products', menuId: 'Products', newStylesheet: '', newJSlink: ''})
})

Route.get('/single/:_id', product)
Route.get('/:page', getProducts)


Route.post('/add', upload.single('image'), addProduct)

module.exports = Route