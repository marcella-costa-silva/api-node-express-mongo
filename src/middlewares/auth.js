const jwt = require('jsonwebtoken')
const authConfig = require('./../config/auth')

module.exports = (req, res, next) => {
  // Busca o header de autorização
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' })

  // Verificação para saber se está no formato certo (Bearer + hash)
  const parts = authHeader.split(' ')

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' })

  const [ scheme, token ] = parts // scheme = Bearer, token = hash

  // Verifica se Bearer é a primeira palavra
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' })

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' })
    req.userId = decoded.id // decoded -> id do usuário se a requisição der certo
    return next()
  })
}
