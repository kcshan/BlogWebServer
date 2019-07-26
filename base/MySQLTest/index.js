const mysql = require("mysql")

// 创建链接对象
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: "myblog"
})

// 开始连接
con.connect()

// 执行sql语句
// 查询
// const sql = "select * from users;"

// 更新
// const sql = `update users set realname='张三三' where username='zhangsan3'`
// 修改是否成功可以根据返回的affectedRows和changedRows来判断

// 新增
// const sql = `insert into blogs (title, content, createtime, author, state) values ("标题C", "内容C", 1563695342247, "张三C", 1);`
// 新增成功与否根据insertId判断

// 删除
// 同修改 软删除

con.query(sql, (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(result)
})

con.end()