const Router = require('koa-router')
const route = new Router({
  prefix: '/users'
})
const user = require('../controllers/user')
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
route.post('/', user.create)

route.get('/', user.find)

route.get('/:id', user.findById)

route.patch('/:id', auth, user.update)

route.delete('/:id', auth, user.checkOwner, user.delete)
route.post('/login', user.login)
route.get('/:id/following', user.listFollowing)
route.put('/follow/:id', auth, user.checkUserExist, user.follow)
route.delete('/unfollow/:id', auth, user.checkUserExist, user.unfollow)
route.get('/:id/follower', auth, user.listFollowers)
module.exports = route
