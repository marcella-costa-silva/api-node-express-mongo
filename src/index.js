const express = require('express') // Ajuda com as tratativas de rotas e requests http
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json()) // Entenda JSON.
app.use(bodyParser.urlencoded({ extended: false })) // Entenda parâmetros da URL

// app.get('/', (req, res) => res.send('Ok')) // Rota de teste

require('./controllers/authController')(app) // Repassa o app para ser utilizado em authController

app.listen(3000)
