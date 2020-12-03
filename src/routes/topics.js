const Router = require('koa-router')
const jwt = require('koa-jwt2')
const route = new Router({
  prefix: '/topics'
})
const topic = require('../controllers/topic')
const {
  code
} = require('../config')
const auth = jwt({
  secret: code
})
route.post('/', auth, topic.create)

route.get('/', topic.find)

route.get('/:id', topic.findById)

route.patch('/:id', auth, topic.update)
// 获取话题粉丝列表
route.get('/:id/topicFollower', auth, topic.listTopicFollowers)
module.exports = route
