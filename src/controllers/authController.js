const express = require('express') // Sempre que for mexer com rotas

const User = require('../models/User') // Necessário p/ ações de login e cadastro

const router = express.Router() // Definir rotas para usuário

// Cria novo usuário quando chamar a rota
router.post('/register', async (req, res) => {
  const { email } = req.body

  try {
    // Verifica se o usuário já é cadastrado
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exits' })

    const user = await User.create(req.body) // Todos os parâmetros estão dentro de req.body (name, email, pass)

    user.password = undefined // Não retorna a senha quando for cadastrado

    return res.send({ user })
  } catch (error) {
    return res.status(400).send({ error: 'Registration failed' })
  }
})

// Todas as rotas definidas serão pré-fixadas com '/auth'
module.exports = app => app.use('/auth', router)
