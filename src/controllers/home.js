class HomeCtl {
  index(ctx) {
    ctx.body = {
      title: 'koa2 json',
      cookie: ctx.cookies.get('mycookie')
    }
  }
}

module.exports = new HomeCtl()
