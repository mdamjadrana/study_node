const Route = require('express').Router()
const ifLoggedIn = require('../middleware/ifLoggedIn')

Route.get('/', ifLoggedIn, (req, res) => {
  res.render('pages/admin', {page: 'Admin', menuId:'admin', newStylesheet: '', newJSlink: ''})
})

module.exports = Route;