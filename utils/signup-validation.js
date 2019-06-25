const createUser = require('../models/auth')

module.exports = async (req) => {
  if(req.body.firstname.length === 0)
    req.check('firstname', 'Firstname is required!').custom(() => false)
  else
    req.check('firstname', 'Firstname should be atleast 3 character!').isLength({min: 3})
  
  if(req.body.lastname.length === 0)
    req.check('lastname', 'lastname is required!').custom(() => false)
  else
    req.check('lastname', 'lastname should be atleast 3 character!').isLength({min: 3})

  const userNameExists = await createUser.findOne({username: req.body.username})
  if(req.body.username.length === 0){
    req.check('username', 'username is required!').custom(() => false)
  } else if(req.body.username.length < 3){
    req.check('lastname', 'lastname should be atleast 3 character!').isLength({min: 3})
  } else if(userNameExists){
    req.check('username', `${req.body.username} is already taken.`).custom(() => false)
  }

  const emailExists = await createUser.findOne({email: req.body.email})
  if(req.body.email.length === 0){
    req.check('email', 'email is required!').custom(() => false)
  } else if(emailExists){
    req.check('email', `already used this email: ${req.body.email}!`).custom(() => false)
  } else{
    req.check('email', 'must be a valid email!').isEmail()
  }

  if(req.body.phonenumber.length === 0)
    req.check('phonenumber', 'phonenumber is required!').custom(() => false)
  else
    req.check('phonenumber', 'phonenumber is not valid(insert a bd number)!').isMobilePhone(['bn-BD'])

  if(req.body.password.length === 0)
    req.check('password', 'password is required!').custom(() => false)
  else
    req.check('password', 'password should be atleast 6 character!').isLength({min:6})
  
  req.check('password', 'password not matched!').equals(req.body.repeatpassword);
}