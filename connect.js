const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mytodo', {useNewUrlParser: true})
  .then(data => {
    console.log("DB Connect successfully!")
  })
  .catch(err => {
    console.log("Disconnected!")
  })