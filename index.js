const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'hello koa!!!'
})

app.listen('3006', () => {
  console.log('Server is running at port: 3006')
})