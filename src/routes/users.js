const Router = require('koa-router')
const route = new Router({
  prefix: '/users'
})
const user = require('../controllers/user')
const topic = require('../controllers/topic')
// const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt2')
const {
  code
} = require('../config')

// const auth = async (ctx, next) => {
//   const {
//     authorization
//   } = ctx.request.headers
//   const token = authorization.replace('Bearer ', '')
//   try {
//     const user = jsonwebtoken.verify(token, code)
//     ctx.state.user = user
//   } catch (err) {
//     ctx.throw(401, err.message)
//   }
//   await next()
// }
const auth = jwt({ secret: code })
// 用户注册
route.post('/', user.create)
// 查找用户列表
route.get('/', user.find)
// 查找用户详情
route.get('/:id', user.findById)
// 更新用户信息
route.patch('/:id', auth, user.update)
// 注销用户
route.delete('/:id', auth, user.checkOwner, user.delete)
// 用户登陆
route.post('/login', user.login)
// 用户专注的人的列表
route.get('/:id/following', user.listFollowing)
// 关注默认
route.put('/follow/:id', auth, user.checkUserExist, user.follow)
// 关注话题
route.put('/followTopic/:id', auth, topic.checkTopicIsExist, user.followTopic)
// 取消关注话题
route.delete('/unfollowTopic/:id', auth, topic.checkTopicIsExist, user.unfollowTopic)
// 获取粉丝列表
route.get('/:id/follower', auth, user.listFollowers)
// 获取话题粉丝列表
route.get('/:id/followerTopic', auth, user.listFollowersTopic)
// 关注话题的列表
route.get('/:id/followingTopic', user.listFollowingTopic)
module.exports = route
