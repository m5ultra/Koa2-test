const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')
const {
  code
} = require('../config')

class UserCtl {
  async find(ctx) {
    ctx.body = await User.find()
  }
  async checkOwner(ctx, next) {
    if (ctx.state.user._id !== ctx.params.id) {
      ctx.throw(403, '权限不足！')
    }
    await next()
  }
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '查找用户不存在')
    }
    ctx.body = user
  }

  async create(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
    })
    const {
      name
    } = ctx.request.body
    const isExist = await User.findOne({
      name
    })
    if (isExist) {
      ctx.throw(409, '用户名被占用！')
    }
    ctx.body = await new User(ctx.request.body).save()
  }

  async update(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true})
    if (!user) {
      ctx.throw(404, '要更新用户不存在')
    }
    ctx.body = user
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.throw(404, '要删除用户不存在')
    }
    ctx.body = user
  }

  async login(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
    })

    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, '用户名或密码错误！')
    }
    const {
      name,
      _id
    } = user
    const token = jsonwebtoken.sign({
      _id,
      name
    }, code, {
      expiresIn: '1h'
    })
    ctx.body = {
      status: 200,
      msg: '登陆成功',
      success: true,
      token
    }

  }
}

module.exports = new UserCtl()
