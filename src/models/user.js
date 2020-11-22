const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  __v: { type: String, select: false },
  name: { type: String, required: true },
  password: { type: Number, required: true, selected: false }
})

module.exports = model('User', userSchema)
