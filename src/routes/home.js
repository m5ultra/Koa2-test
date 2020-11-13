const Router = require('koa-router')
const { index } = require('../controllers/home')
const route = new Router()
route.get('/', index)
module.exports = route
