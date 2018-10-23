const Router = require('koa-router')

let router = new Router()

router.get('/', async(ctx) => {
  ctx.body = '这是设置文章首页'
})

module.exports = router