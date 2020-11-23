const path = require('path')
class HomeCtl {
  index(ctx) {
    ctx.body = {
      title: 'koa2 json',
      cookie: ctx.cookies.get('mycookie')
    }
  }

  upload(ctx) {
    const file = ctx.request.files.file
    const baseName = path.basename(file.path)
    ctx.body = { url: `${ctx.origin}/uploads/${baseName}` }
    // console.log(ctx.request.files)
    // console.log(ctx.request.body)
    // ctx.body = JSON.stringify(ctx.request.files)
  }
}

module.exports = new HomeCtl()
