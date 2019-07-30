// 引入http
const http = require("http")
// 创建一个slice函数
const slice = Array.prototype.slice
// 定义一个class
class LikeExpress {
  // 构造函数
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [],  // app.use(...) 需要接收的中间件
      get: [],  // app.get(...) 需要接收的中间件
      post: [],  // app.post(...) 需要接收的中间件
      // put: [],
      // patch: [],
      // delete: []
    }
  }
  // use get post三个中间件 通用注册的方法
  // 第一个参数路由
  register(path) {
    const info = {}
    // 如果第一个参数不是路由，那它就是根目录”/“
    if (typeof path === "string") {
      // 如果path是字符串的话，说明第一个参数是路由，第二个开始就是中间件
      info.path = path
      // stack是当前注册信息的所有中间件的信息
      // 从第二个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 1)
    } else {
      // 如果第一个参数不是路由，那它就是根目录”/“
      info.path = "/"
      // 第一个开始就是中间件
      // 从第一个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 0)
    }
    // info有俩个信息，一个是path（path对应当前的路由），一个是stack（对应当前的中间件数组）
    return info
  }

  // 无论哪种请求方式都先交给register来处理，返回一个info的对象，
  // 包含有俩个信息，一个是path（path对应当前的路由），一个是stack（对应当前的中间件数组）
  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  match(method, url) {
    // stack就是要返回的resultList
    let stack = []
    // 这个是浏览器主动发送的请求，浏览器icon
    if (url === "favicon.ico") {
      return stack
    }

    // 获取 routes
    let curRoutes = []
    // 通过routes.all和routes[method]把可用的中间件找出来
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])
    curRoutes.forEach(routeInfo => {
      // 如果当前url.indexOf(routeInfo.path) === 0
      // 判断当前请求的url是不是跟routeInfo.path相符，或者跟父路径或者跟根路径相符
      if (url.indexOf(routeInfo.path) === 0) {
        // url === "/api/get-cookie" 且 routeInfo.path === "/"
        // url === "/api/get-cookie" 且 routeInfo.path === "/api"
        // url === "/api/get-cookie" 且 routeInfo.path === "/api/get-cookie"
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }

  // 核心的next机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader("Content-type", "application/json")
        res.end(
          JSON.stringify(data)
        ) 
      }
      // 获取url
      const url = req.url
      // 获取method
      // 遍历中间件哪些中间件需要访问，哪些中间件不需要访问，是通过url和method来区分
      const method = req.method.toLowerCase()
      // 获取url获取method之后，需要拿这俩个去match匹配一个可用的中间件列表
      const resultList = this.match(method, url)
      // 处理next机制
      this.handle(req, res, resultList)
    }
  }

  listen(...args) {
    // 结构arguments
    // createServer传入一个函数
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}
// 输出一个函数（工厂函数：产生一个新的对象，输出出去）
module.exports = () => {
  // LikeExpress对象的实例
  return new LikeExpress
}