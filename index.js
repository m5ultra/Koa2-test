const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const route = new Router({ prefix: '/users' })
// const route = new Router()

// 多中间价用法
//
// const auth = (ctx, next) => {
//     if(ctx.url !== '/users') {
//       ctx.throw(401)
//     }
//     next()
// }
//
// route.get('/users',  (ctx) => {
//   ctx.body = '获取用户列表。'
// })
//
// route.post('/users',  (ctx) => {
//   ctx.body = '新建用户。'
// })
// route.get('/users/:id', auth, (ctx) => {
//   ctx.body = `这是特定用户${ctx.params.id}`
// })

route.post('/', ctx => {
  ctx.body = { name: '李雷' }
})

route.get('/', ctx => {
  ctx.body = [{ name: '李雷' }, {name: '韩梅梅'}]
})

route.patch('/', ctx => {
  ctx.body = { name: '李雷2' }
})

route.delete('/', ctx => {
  ctx.body = { name: '李雷3' }
})
app.use(route.routes())
app.use(route.allowedMethods())

app.listen('5288', () => {
  console.log('Server is running at port: 5288')
})
