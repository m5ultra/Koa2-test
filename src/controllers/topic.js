const Topic = require('../models/topic')

class TopicCtl {
  async find(ctx) {
    const { pageSize = 10, page = 1 } = ctx.query
    ctx.body = await Topic.find()
    .limit(parseInt(Math.abs(pageSize), 10))
    .skip((parseInt(Math.abs(page), 10) - 1) * Math.abs(pageSize))
  }

  async findById(ctx) {
    const { fields = ';' } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => '+' + f).join(' ')
    const topic = await Topic.findById(ctx.params.id).select(selectFields)
    ctx.body = {
      topic
    }
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: {
        type: 'string',
        required: false
      },
      introduction: {
        type: 'string',
        required: false
      }
    })
    ctx.body = await new Topic(ctx.request.body).save()
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false }
    })
    ctx.body = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true })
  }
}

module.exports = new TopicCtl()
