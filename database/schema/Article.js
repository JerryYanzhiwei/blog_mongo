const mongoose = require('mongoose')

const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

// 创建文章Schema

const articleSchema = new Schema({
  id: {type: ObjectId},
  classify: {type: String},
  source: {type: String},
  title: {type: String},
  discript: {type: String},
  content: {type: String},
  author: {type: String},
  createAt: {type: String},
  imgUrl: {type: String},
  record: {type: Date, default: Date.now()}
}, {
  collection: 'article'
})

// 发布模型
mongoose.model('Article', articleSchema)