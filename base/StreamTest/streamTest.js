const http = require("http")

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
  //   const result = ""

  //   req.on("data", (chunk) => {
  //     // 接收到部分数据
  //     const str = chunk.toString()
  //     console.log("接收到部分数据", str.length)
  //     reuslt += str
  //   })
  // }

  // req.on("end", () => {
  //   // 接收数据完成
  //   console.log("end")
  //   res.end("ok")
  // })
    // 传什么就返回什么
    req.pipe(res)
  }
})

server.listen(3004, () => {
  console.log("server listening at 3004")
})