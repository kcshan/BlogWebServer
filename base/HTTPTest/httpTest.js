const http = require("http")
const querystring = require("querystring")

const server = http.createServer((req, res) => {
  // 请求方法
  const method = req.method
  // 请求url
  const url = req.url
  // 请求路径
  const path = url.split("?")[0]
  // 请求参数
  const query = querystring.parse(url.split("?")[1])

  // 设置格式为JSON
  res.setHeader("Content-type", "application/json")

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }

  // 返回
  if (method == "GET") {
    res.end(JSON.stringify(resData))
  }

  if (req.method === "POST") {
    // 接收数据
    let postData = ""
    req.on("data", chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(JSON.stringify(resData)) // 在祥和里返回，因为是异步
    })
  }
})

server.listen(3001, () => {
  console.log("server listening 3001")
})