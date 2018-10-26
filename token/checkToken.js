const jwt = require('jsonwebtoken')
// 检查token是否已经过期
module.exorts = async (ctx, next) => {
  // 拿到token
  const authorization = ctx.get('authorization')
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization')
  }
  const token = authorization.split('')[1]
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, 'yanzhiwei')
  } catch (err) {
    ctx.throw(401, 'invalid token')
  }
  await next()
}