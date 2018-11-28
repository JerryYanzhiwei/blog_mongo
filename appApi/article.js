const Router = require('koa-router')

const mongoose = require('mongoose')

const multer = require('koa-multer')

let router = new Router()



router.get('/', async(ctx) => {
  ctx.body = '这是设置文章首页'
})

// 添加文章

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

// 获取文章列表

router.get('/get_artical', async (ctx) => {
  const Article = mongoose.model('Article')
  await Article.find().exec().then(async(result) => {
    console.log(result)
    ctx.body = {
      code: 200,
      message: 'success',
      data: result
    }
  })
})

// 获取文章详情

router.get('/get_article_detail', async (ctx) => {
  let id = ctx.query.id
  const Article = mongoose.model('Article')
  await Article.findOne({
    _id: id
  }).exec().then(async (result) => {
    console.log(result)
    if (result) {
      ctx.body = {
        code: 200,
        message: 'success',
        data: result
      }
    } else {
      ctx.body = {
        code: 500,
        message: 'error',
      }
    }
  })
})

// 编辑文章
router.post('/edit_article', async (ctx) => {
  let aritcle_edit = ctx.request.body
  const Article = mongoose.model('Article')
  await Article.update({
    _id: aritcle_edit._id
  }, aritcle_edit).then(result => {
    console.log(result)
    if (result.ok) {
      ctx.bdoy = {
        code: 200,
        message: 'success'
      }
    } else {
      ctx.body = {
        code: 9999,
        message: 'server is error'
      }
    }
  })
})

// 文件上传
var storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },

  // 修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

// 加载配置
var upload = multer({storage: storage})

router.post('/upload', upload.single('file'), async (ctx, next) => {
  // console.log(ctx.req)
  ctx.body = {
    code: 200,
    filename: `www.jerryzw.top/${ctx.req.file.filename}`
  }
})

module.exports = router