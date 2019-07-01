const Route = require('express').Router()
const {getProducts, addProduct, product, searchProduct} = require('../controllers/products')
const upload = require('../uploadMiddleware')
const ifLoggedIn = require('../middleware/ifLoggedIn')

Route.get('/add',ifLoggedIn, (req,res, next) => {
  res.render('pages/products/addProduct', {page: 'Products', menuId: 'Products', newStylesheet: '', newJSlink: ''})
})

Route.get('/single/:_id', product)
Route.get('/:page', getProducts)


Route.post('/searchresult', searchProduct)

Route.post('/add', upload.single('image'), addProduct)

module.exports = Route