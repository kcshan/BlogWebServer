const http = require("http")
const querystring = require("querystring")

const server = http.createServer((req, res) => {
  console.log(req.method) 
  const url = req.url
  req.query = querystring.parse(url.split("?")[1]) // 解析querystring
  res.end(JSON.stringify(req.query))
})

server.listen(3001, () => {
  console.log("server listening 3001")
})