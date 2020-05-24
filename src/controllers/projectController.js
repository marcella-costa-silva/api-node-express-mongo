const express = require('express')
const authMiddleware = require('./../middlewares/auth')

const router = express.Router()

router.use(authMiddleware)

router.get('/', (req, res) => {
  res.send({ ok: true })
})

// Todas as rotas definidas serão pré-fixadas com '/projects'
module.exports = app => app.use('/projects', router)
