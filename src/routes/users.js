const Router = require('koa-router')
const route = new Router({
  prefix: '/users'
})
const user = require('../controllers/user')
const jsonwebtoken = require('jsonwebtoken')
const {
  code
} = require('../config')
const auth = async (ctx, next) => {
  const {
    authorization
  } = ctx.request.headers
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jsonwebtoken.verify(token, code)
    ctx.state.user = user
  } catch (err) {
    ctx.throw(401, err.message)
  }
  await next()
}
route.post('/', user.create)

route.get('/', user.find)

route.get('/:id', user.findById)

route.patch('/:id', auth,  user.update)

route.delete('/:id', auth, user.checkOwner, user.delete)
route.post('/login', user.login)
module.exports = route
