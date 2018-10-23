const Router = require('koa-router')

let router = new Router()

router.get('/', async(ctx) => {
  ctx.body = '这是用户操作首页'
})

router.get('/login', async(ctx) => {
  ctx.body = '用户登录接口'
})

router.post('/register', async(ctx) => {
  console.log(ctx.request.body)
  ctx.body = ctx.request.body
})

module.exports = router