class UserCtl {
  find(ctx) {
    console.log('查找')
    ctx.body = [{ name: '李雷' }, { name: '韩梅梅' }]
  }

  create(ctx) {
    console.log('新增')
    ctx.body = { name: '李雷' }
  }

  update(ctx) {
    console.log('修改')
    ctx.body = { name: '李雷2' }
  }

  delete(ctx) {
    console.log('删除')
    ctx.body = { name: '李雷3' }
  }
}

module.exports = new UserCtl()
