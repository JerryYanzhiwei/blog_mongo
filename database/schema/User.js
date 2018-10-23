const mongoose = require('mongoose')

const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// 创建用户Schame

const userSchema = new Schema({
  userId: {type: ObjectId},
  userName: {unique: true, type: String},
  password: {type: String},
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
})


// 密码加盐加密
userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

// 发布模型
mongoose.model('User', userSchema)