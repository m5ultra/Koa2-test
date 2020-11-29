const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')
const {
  code
} = require('../config')

class UserCtl {
  async find(ctx) {
    const { pageSize = 10, page = 1 } = ctx.query
    ctx.body = await User.find()
    .limit(parseInt(Math.abs(pageSize), 10))
    .skip((parseInt(Math.abs(page), 10) - 1) * Math.abs(pageSize))
  }

  async checkOwner(ctx, next) {
    if (ctx.state.user._id !== ctx.params.id) {
      ctx.throw(403, '权限不足！')
    }
    await next()
  }

  async findById(ctx) {
    const {
      fields = ';'
    } = ctx.query
    // tips: 注意用空格链接 mongoose语法: modal.select(+a +b)select(-c)
    const selectFields = fields.split(';').filter(f => f).map(f => '+' + f).join(' ')
    const user = await User.findById(ctx.params.id).select(selectFields).select('-password')
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
        required: false
      },
      password: {
        type: 'string',
        required: false
      },
      avatar_url: {
        type: 'string',
        required: false
      },
      gender: {
        type: 'string',
        required: false
      },
      headline: {
        type: 'string',
        required: false
      },
      locations: {
        type: 'array',
        itemType: 'string',
        required: false
      },
      business: {
        type: 'string',
        required: false
      },
      employments: {
        type: 'array',
        itemType: 'object',
        required: false
      },
      educations: {
        type: 'array',
        itemType: 'object',
        required: false
      }
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
      new: false
    })
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

  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id).select('+following').populate('following')
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = {
      following: user.following
    }
  }

  async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following')
    if (!me.following.map(v => v.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id)
      me.save()
    }
    // 成功了 但是没有内容返回
    ctx.status = 204
  }

  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在。')
    }
    await next()
  }

  async unfollow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following')
    const index = me.following.map(v => v.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      me.following.splice(index, 1)
      me.save()
    }
    ctx.status = 204
  }

  async listFollowers(ctx) {
    ctx.body = await User.find({
      following: ctx.params.id
    })
  }
}

module.exports = new UserCtl()
