const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {
  const method = req.method;
  if (method === "GET") {
    // 文件IO
    const fileName = path.resolve(__dirname, "data.txt")
    const stream = fs.createReadStream(fileName)
    // 网络IO
    stream.pipe(res)
  }
})

server.listen(3005, () => {
  console.log("server is listening at 3005")
})