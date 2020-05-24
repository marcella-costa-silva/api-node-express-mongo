const express = require('express') // Sempre que for mexer com rotas
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('./../config/auth')

const User = require('../models/User') // Necessário p/ ações de login e cadastro

const router = express.Router() // Definir rotas para usuário

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400 // 1 dia
  })
}

// Cria novo usuário quando chamar a rota
router.post('/register', async (req, res) => {
  const { email } = req.body

  try {
    // Verifica se o usuário já é cadastrado
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exits' })

    const user = await User.create(req.body) // Todos os parâmetros estão dentro de req.body (name, email, pass)

    user.password = undefined // Não retorna a senha quando for cadastrado

    return res.send({ 
      user,
      token: generateToken({ id: user.id })
    })

  } catch (error) {
    return res.status(400).send({ error: 'Registration failed' })
  }
})

// Rota de autenticação
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password') // Busca usuário pelo email, traz a senha

  if (!user)
    return res.status(400).send({ error: 'User not found' })

  // Compara o password digitado com o password do usuário
  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password' })

  user.password = undefined

  res.send({ 
    user, 
    token: generateToken({ id: user.id })
  })
})

// Todas as rotas definidas serão pré-fixadas com '/auth'
module.exports = app => app.use('/auth', router)
