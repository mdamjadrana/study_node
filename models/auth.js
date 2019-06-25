const mongoose = require('mongoose')
const schema = mongoose.Schema;

const registrationSchema = new schema({
  firstname:{
    type: String,
    minlength: 3,
    trim: true
  },
  lastname:{
    type: String,
    minlength: 3,
    trim: true
  },
  username: {
    type: String,
    minlength: 3,
    unique: true,
    trim: true
  },
  email:{
    type: String,
    minlength: 3,
    unique: true
  },
  phonenumber:{
    type: Number,
    minlength: 3,
  },
  password:{
    type: String,
    minlength: 3,
  }
})

module.exports = mongoose.model('user', registrationSchema);