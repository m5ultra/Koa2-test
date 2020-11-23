const Router = require('koa-router')
const { index, upload } = require('../controllers/home')
const route = new Router()
route.get('/', index)
route.post('/upload', upload)
module.exports = route
