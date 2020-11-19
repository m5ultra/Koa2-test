const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  __v: { type: String, select: false },
  name: { type: String, required: true },
  age: { type: Number, required: false }
})

module.exports = model('User', userSchema)
