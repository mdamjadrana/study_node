const createUser = require('../models/auth')
const bcryptjs = require('bcryptjs')
const signupValidation = require('../utils/signup-validation')

const registrationController = async (req, res) => {
  // Validation
  signupValidation(req)

  const validationResult = req.validationErrors();

  //Create User
  if(!validationResult){
    let {firstname, lastname, username, email, phonenumber, password} = req.body
    password = bcryptjs.hashSync(password)
    const newUser = new createUser({firstname, lastname, username, email, phonenumber, password})
    const createNewUser = await newUser.save()
      try {
        if(createNewUser){
          req.flash('success_msg', 'Registration Successfully')
          res.redirect('/login')
        }
      } catch (error) {
        res.json({
          msg: `error occured!`,
          error: err
        }) 
      }
  } else{
    req.flash('errors', req.validationErrors())
    res.redirect('back')
  }
}

const logController = async (req, res) => {
  //validation
  if(req.body.username.length === 0)
    req.check('username', 'username is required!').custom(() => false)
  
  if(req.body.password.length === 0)
    req.check('password', 'password is requried!').custom(() => false)
  
  let validationResult = req.validationErrors();

  if(!validationResult){
    const usernameExists = await createUser.findOne({username: req.body.username})

    if(usernameExists){
      let result =  bcryptjs.compareSync(req.body.password, usernameExists.password)

      if(result){
        req.session.authUserId = usernameExists._id
        req.flash('success_msg', 'Login Successfully')
        res.redirect('/logout')
      } else{
        req.flash('error_msg', 'Password not correct!')
        res.redirect('back')
      }
    } else{
        req.flash('error_msg', 'User Not Found!')
        res.redirect('back')
    }
  } else{
    req.flash('errors', req.validationErrors())
    res.redirect('back')
  }

}

const logoutController = (req, res) => {
  req.session.authUserId = null
  req.flash('success_msg', 'Logout successfully!')
  res.redirect('/login')
}

module.exports = {logController, registrationController, logoutController}