const express  = require('express')
const app = express()
require('dotenv').config()
const ejsLayouts = require('express-ejs-layouts')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const User = require('./models/auth')
const path = require('path')
const Product = require('./models/products')

//Connect DB
require('./connect')


//Set view engine
app.set('view engine', 'ejs');


//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname , 'public')))
app.use(ejsLayouts)
app.use(expressValidator())

//Session & Cookie
app.use(cookieParser())
app.use(session({
  secret: process.env.SECRETKEY,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())


//Globals variables
app.use( async (req, res, next) => {
  app.locals.errors = req.flash('errors')
  app.locals.error_msg = req.flash('error_msg')
  app.locals.success_msg = req.flash('success_msg')
  req.isAuthenticated  = req.session.authUserId ? true : false;
  app.locals.isAuthenticated = req.isAuthenticated
  if(req.session.authUserId){
    const logedUser = await User.findById(req.session.authUserId);
    req.user = logedUser
    app.locals.fullName = logedUser.firstname + ' ' + logedUser.lastname;
  }
  app.locals.products = await Product.find({})
  next()
})


//Routes
app.get('/', (req, res) => {
  res.render('pages/index', {page: 'Home', menuId: 'home', newStylesheet: '', newJSlink: ''})
})

const authRoutes = require('./routes/auth')
app.use('/', authRoutes)
const adminRoutes = require('./routes/admin')
app.use('/admin', adminRoutes)

const productRoutes = require('./routes/product')
app.use('/products', productRoutes)

app.get('/session', (req, res) =>{
  res.json(req.session)
})

//listen
app.listen(process.env.PORT, () => {
  console.log(`App Rungin in http://localhost:${process.env.PORT}`);
})