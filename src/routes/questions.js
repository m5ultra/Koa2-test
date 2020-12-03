const Router = require('koa-router')
const jwt = require('koa-jwt2')
const route = new Router({
  prefix: '/questions'
})
const { code } = require('../config')
const question = require('../controllers/question')
const auth = jwt({
  secret: code
})


route.post('/', auth, question.create)

route.get('/', question.find)

route.get('/:id', question.checkQuestionIsExist, question.findById)

route.patch('/:id', auth, question.checkQuestionIsExist, question.checkQuestioner, question.update)
route.delete('/:id', auth, question.checkQuestionIsExist, question.checkQuestioner, question.delete)
module.exports = route
