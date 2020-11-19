const Koa = require('koa')
const chalk = require('chalk')
const bodyParser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
// 通过mongoose 链接数据库
const mongoose = require('mongoose')
const { uri } = require('./config')
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Atlas connect success!')
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we\'re connected!')
})

function formatError(err) {
  return {
    status: err.status,
    msg: err.message,
    success: false
  }
}

const app = new Koa()
const routing = require('./routes')
app.use(bodyParser())
app.use(parameter(app))
app.use(error({
  format: formatError,
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}))
routing(app)
app.listen('5288', () => {
  console.log(chalk.green('Server is running at port: http://localhost:5288'))
})
