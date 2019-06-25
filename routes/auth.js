const router = require('express').Router()
const ifNotLoggedIn = require('../middleware/ifNotLoggIn')
const ifLoggedIn = require('../middleware/ifLoggedIn')
const {logController, registrationController, logoutController} = require('../controllers/auth')

//Get methods
router.get('/login', ifNotLoggedIn, (req, res) => {
  res.render('pages/auth/login', {page: 'Login', menuId: 'Login', newStylesheet: '', newJSlink: ''})
});
router.get('/signup', ifNotLoggedIn,  (req, res) => {
  res.render('pages/auth/registration', {page: 'Registration', menuId: 'registration', newStylesheet: '', newJSlink: ''})
});
router.get('/logout', ifLoggedIn, (req, res) => {
  res.render('pages/auth/logout', {page: 'Logout', menuId: 'logout', newStylesheet: '', newJSlink: ''})
});

// Post Methods
router.post('/login', logController);
router.post('/signup', registrationController);
router.post('/logout', logoutController);

module.exports = router