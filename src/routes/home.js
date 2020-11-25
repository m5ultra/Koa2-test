const Router = require('koa-router')
const multer = require('@koa/multer')
const path = require('path')
//配置
let storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/')) //注意路径必须存在
  },
  //修改文件名称
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

//加载配置
let uploadFile = multer({
  storage: storage
})
const {
  index,
  upload
} = require('../controllers/home')
const route = new Router()
route.get('/', index)
route.post('/upload', uploadFile.single('file'), upload)
module.exports = route