const fs = require("fs")
const path = require("path")

// 写日志
const writeLog = (writeStream, log) => {
  writeStream.write(log + "\n") // 关键代码
}

// 生成wirte Stream
const createWriteStream = (fileName) => {
  const fullFileName = path.join(__dirname, "../", "../", "logs", fileName)
  const wirteStream = fs.createWriteStream(fullFileName, {
    flags: "a",
  })
  return wirteStream
}

const accessWriteStream = createWriteStream("access.log")

const access = (log) => {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}

// shell
// *0*** sh /Users/yangshasha/Downloads/workspace/coding/nodejs/WebServer/blog-1/src/utils/copy.sh