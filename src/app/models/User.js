const mongoose = require('../../database')
const bcrypt = require('bcryptjs') // Encriptar a senha.

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false // Não aparecerá no array de usuários.
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Antes de salvar o usuário, a senha será criptogradfada.
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10) // 10 -> quantas vezes o hash será gerado.
  this.password = hash // this -> usuário que está sendo salvo.
  next()
})

const User = mongoose.model('User', UserSchema) // Nome do model + Schema.

module.exports = User