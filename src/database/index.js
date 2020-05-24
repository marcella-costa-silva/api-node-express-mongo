const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true }) // noderest -> nome do banco
mongoose.connect('mongodb://localhost/noderest') // noderest -> nome do banco
mongoose.Promise = global.Promise

module.exports = mongoose
