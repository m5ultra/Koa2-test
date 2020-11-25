const path = require('path')
class HomeCtl {
  index(ctx) {
    ctx.body = {
      title: 'koa2 json',
      cookie: ctx.cookies.get('mycookie')
    }
  }

  async upload(ctx) {
    const baseName = ctx.file.filename
    ctx.body = {
      url: `${ctx.origin}/uploads/${baseName}`
    }
  }


}

module.exports = new HomeCtl()