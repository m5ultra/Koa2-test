const Router = require('koa-router')
const route = new Router({ prefix: '/users' })
const user = require('../controllers/user')
route.post('/', user.create)

route.get('/', user.find)

route.patch('/', user.update)

route.delete('/', user.delete)
module.exports = route
