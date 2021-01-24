const mongoose = require('mongoose')
const {
  Schema,
  model
} = mongoose

const QuestionSchema = new Schema({
  __v: { type: String, select: false },
  title: { type: String, required: true },
  description: { type: String },
  questioner: { type: Schema.Types.ObjectId, ref: 'User', required: false, select: false },
  topics: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic'}], select: false }
})

module.exports = model('Question', QuestionSchema)
