const fs = require("fs")
const path = require("path")

// 绝对路径
// const fullFileName = path.resolve(__dirname, "files", "a.json")
// fs.readFile(fullFileName, (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data.toString())
// })

// callback 范式获取一个文件的内容
// function getFileContent(fileName, callback) {
//   // 绝对路径
//   const fullFileName = path.resolve(__dirname, "files", fileName)
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     callback(JSON.parse(data.toString()))
//   })
// }

// 测试
// getFileContent("a.json", aData => {
//   console.log("a data", aData)
//   getFileContent(aData.next, bData => {
//     console.log("b data", bData)
//     getFileContent(bData.next, cData => {
//       console.log("c data", cData)
//     })
//   })
// })

// 用promise获取文件内容
function getFileContent(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, "files", fileName)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}

getFileContent("a.json").then(aData => {
  console.log("a data", aData)
  return getFileContent(aData.next)
}).then(bData => {
  console.log("b data", bData)
  return getFileContent(bData.next)
}).then(cData => {
  console.log("c data", cData)
})

async function readFileData() {
  // 返回的是一个promise，await后面跟一个promise 可以把promise里面的resolve内容直接取出来复制给aData
  // 同步写法
  try {
    const aData = await getFileContent("a.json")
    console.log("a data", aData)
    const bData = await getFileContent(aData.next)
    console.log("b data", bData)
    const cData = await getFileContent(bData.next)
    console.log("c data", cData)
  } catch (err) {
    console.error(err)
  }
}

readFileData()

async function readAdata() {
  const aData = await getFileContent("a.json")
  return aData
}

async function test() {
  const aData = await readAdata()
  console.log(aData)
}
test()

// async await要点：
// 1. await后面可以追加promise对象
// 2. await必须包裹在async函数里面
// 3. async函数执行返回的也是一个promise对象
// 4. try-catch截获promise中reject的值