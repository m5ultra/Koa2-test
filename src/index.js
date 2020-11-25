const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const bodyParser = require('koa-bodyparser')

// const koaBody = require('koa-body')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const serve = require('koa-static')
// 通过mongoose 链接数据库
const mongoose = require('mongoose')
const {
  uri
} = require('./config')
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Atlas connect success!')
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we\'re connected!')
})

// function formatError(err) {
//   return {
//     status: err.status,
//     msg: err.message,
//     success: false
//   }
// }

const app = new Koa()
app.use(serve(path.join(__dirname, 'public')))
const routing = require('./routes')
app.use(bodyParser())
// app.use(koaBody({
//   multipart: true, // 支持文件上传
//   encoding: 'gzip',
//   formidable: {
//     uploadDir: path.join(__dirname, 'public/uploads/'), // 设置文件上传目录
//     keepExtensions: true,    // 保持文件的后缀
//     maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
//     onFileBegin: (name, file) => { // 文件上传前的设置
//       // console.log(`name: ${name}`);
//       // console.log(file);
//     },
//   }
// }))
app.use(parameter(app))
app.use(error({
  // format: formatError,
  postFormat: (e, {
    stack,
    ...rest
  }) => process.env.NODE_ENV === 'production' ? rest : {
    stack,
    ...rest
  }
}))
routing(app)
app.listen('5288', () => {
  console.log(chalk.green('Server is running at port: http://localhost:5288'))
})
