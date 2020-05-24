const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true })
mongoose.connect('mongodb://localhost/noderest', { // noderest -> nome do banco
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})

mongoose.Promise = global.Promise

module.exports = mongoose
