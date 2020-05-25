const express = require('express') // Ajuda com as tratativas de rotas e requests HTTP.
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) // Entende parâmetros da URL.

// Repassa o app para ser utilizado nos controllers.
require('./app/controllers/index')(app)

app.listen(3000)
