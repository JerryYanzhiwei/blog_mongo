const mongoose = require('mongoose')
const db = "mongodb://localhost/blog"

const glob = require('glob')
const {resolve} = require('path')

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

mongoose.Promise = global.Promise

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db)

  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    // 增加连接数据库监听
    mongoose.connection.on('disconnected', () => {
      console.log('******数据库断开******')
      if (maxConnectTimes < 3) {
        // 进行重连
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出问题, 请检查')
      }
    })
    // 数据库出现错误
    mongoose.connection.on('error', err => {
      console.log('******数据库出现错误******')
      if (maxConnectTimes < 3) {
        // 进行重连
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出问题, 请检查')
      }
    })
  
    // 链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected Successfully')
      resolve()
    }) 
    
  })

}