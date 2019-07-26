const http = require("http")
const querystring = require("querystring")

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    // 数据格式
    console.log("content-type", req.headers['content-type'])
    // 接收数据
    let postData = ""
    req.on("data", chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log(postData)
      res.end("hello world") // 在祥和里返回，因为是异步
    })
  }
})

server.listen(3001, () => {
  console.log("server listening 3001")
})