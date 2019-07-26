const fs = require("fs")
const path = require("path")

// 俩个文件名
const fileName1 = path.resolve(__dirname, "data.txt")
const fileName2 = path.resolve(__dirname, "bak.txt")

// 读取文件的stream对象
const readStream = fs.createReadStream(fileName1)
// 写入文件的stream对象
const writeStream = fs.createWriteStream(fileName2)
// 执行拷贝，通过pipe
readStream.pipe(writeStream)
// 监听每一次读取的内容
readStream.on("data", chunk => {
  console.log(chunk.toString())
})
// 数据读取完成，即拷贝完成
readStream.on("end", function () {
  console.log("拷贝完成")
})