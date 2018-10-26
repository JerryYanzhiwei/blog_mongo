const Router = require('koa-router')

const mongoose = require('mongoose')

let router = new Router()

router.get('/', async(ctx) => {
  ctx.body = '这是设置文章首页'
})


router.post('/add_article', async(ctx) => {
  console.log(ctx.request.body)
  const Article = mongoose.model('Article')
  let data = ctx.request.body
  let addArticle = new Article(data)
  await addArticle.save().then(() => {
    ctx.body = {
      code: 200,
      message: '保存成功'
    }
  }).catch( err => {
    console.log(err)
    ctx.body = {
      ctx: 500,
      message: '保存失败'
    }
  })
})

module.exports = router