const fs = require('fs')
const path = require('path')

module.exports = app => {
  fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.js'))) // Arquivo que não comece com "." e não seja "index".
    .forEach(file => require(path.resolve(__dirname, file))(app)) // Percorre dando um "require".
  }
