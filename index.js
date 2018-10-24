const Koa = require('koa')
const app = new Koa()

// 引入mongoDB
const {connect, initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')

// 引入koa相关
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

// koa2跨域
const cros = require('koa2-cors')

// 使用bodyparser中间件
app.use(bodyParser())

// 设置跨域
app.use(cros())

// 装载子路由
let router =  new Router

// 用户相关接口
let user = require('./appApi/user.js')

// 文章相关接口
let article = require('./appApi/article.js')

// 用户相关接口
router.use('/user', user.routes())

// 文章相关接口
router.use('/article', article.routes())


// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


;(async () => {
  await connect()
  initSchemas()
})()

app.use(async (ctx) => {
  ctx.body = '<h1>hello koa2</h1>'
})

app.listen(3000, () => {
  console.log('[server] is starting at port 3000')
})