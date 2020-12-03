const Question = require('../models/question')

class questionCtrl {
  async checkQuestionIsExist(ctx, next) {
    const question = await Question.findById(ctx.params.id).select('+questioner')
    if (!question) {
      ctx.throw(404, '问题不存在')
    }
    ctx.state.question = question
    await next()
  }

  async find(ctx) {
    const { pageSize = 10, page = 1 } = ctx.query
    const q = new RegExp(ctx.query.q)
    ctx.body = await Question.find({ $or: [{ title: q }, { description: q }] })
    .limit(parseInt(Math.abs(pageSize), 10))
    .skip((parseInt(Math.abs(page), 10) - 1) * Math.abs(pageSize))
  }

  async findById(ctx) {
    const { fields = ';' } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => '+' + f).join(' ')
    const question = await Question.findById(ctx.params.id).select(selectFields).populate('questioner')
    ctx.body = {
      question
    }
  }

  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      description: {
        type: 'string',
        required: false
      }
    })
    ctx.body = await new Question({ ...ctx.request.body, questioner: ctx.state.user._id }).save()
  }

  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: false },
      description: { type: 'string', required: false }
    })
    // 更新有bug 待解决
    await ctx.state.question.updateOne(ctx.request.body)
    ctx.body = {
      msg: '更新成功'
    }
  }

  async checkQuestioner(ctx, next) {
    const { question } = ctx.state
    if (question.questioner.toString() !== ctx.state.user._id) {
      ctx.throw(430, '没有权限')
    }
    await next()
  }

  async delete(ctx) {
    await Question.findByIdAndDelete(
      ctx.params.id
    )
    ctx.status = 204
  }
}

module.exports = new questionCtrl()
