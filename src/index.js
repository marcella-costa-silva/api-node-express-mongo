const express = require('express') // Ajuda com as tratativas de rotas e requests http
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json()) // Entenda JSON.
app.use(bodyParser.urlencoded({ extended: false })) // Entende parâmetros da URL

// app.get('/', (req, res) => res.send('Ok')) // Rota de teste

// Repassa o app para ser utilizado nos controllers
require('./controllers/authController')(app)
require('./controllers/projectController')(app)

app.listen(3000)
