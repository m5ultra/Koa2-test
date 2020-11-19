const Router = require('koa-router')
const route = new Router({ prefix: '/users' })
const user = require('../controllers/user')
route.post('/', user.create)

route.get('/', user.find)

route.get('/:id', user.findById)

route.patch('/:id', user.update)

route.delete('/:id', user.delete)
module.exports = route
