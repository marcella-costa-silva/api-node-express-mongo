const jwt = require('jsonwebtoken')
const authConfig = require('./../config/auth')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization // Busca o header de autorização.

  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' })

  const parts = authHeader.split(' ') // Verificação para saber se está no formato certo ("Bearer" + hash).

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' })

  const [scheme, token] = parts // scheme = Bearer, token = hash.

  // Testa se Bearer é a primeira palavra.
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' })

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' })
    req.userId = decoded.id // decoded -> id do usuário se a requisição der certo.
    return next()
  })
}
