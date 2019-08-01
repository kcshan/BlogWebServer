const http = require("http")

// 组合中间件
const compose = (middlewareList) => {
  return (ctx) => {
    // 中间件调用的逻辑
    const dispatch = (i) => {
      const fn = middlewareList[i]
      try {
        // 经过Promise.resolve的包裹不管fn中间件是普通函数还是Promise函数
        // 返回的都是Promise对象
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)

  }
}

class LikeKoa2 {
  constructor() {
    // 中间件要存储的地方
    this.middlewareList = []
  }

  // use函数去注册
  use(fn) {
    this.middlewareList.push(fn)
    return this
  }

  createContext(req, res) {
    const ctx = {
      req,
      res
    }
    ctx.query = req.query
    return ctx
  }

  handleRequest(ctx, fn) {
    return fn(ctx)
  }
 
  callback() {
    const fn = compose(this.middlewareList)

    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
  }

  // 
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }

}

module.exports = LikeKoa2