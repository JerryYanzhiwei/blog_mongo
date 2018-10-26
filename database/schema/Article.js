const mongoose = require('mongoose')

const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

// 创建文章Schema

const articleSchema = new Schema({
  id: {type: ObjectId},
  type: {type: String},
  from: {type: String},
  title: {type: String},
  content: {type: String},
  author: {type: String},
  createAt: {type: String},
  record: {type: Date, default: Date.now()}
}, {
  collection: 'article'
})

// 发布模型
mongoose.model('Article', articleSchema)