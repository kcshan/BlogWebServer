const xss = require("xss")
const { exec } = require("../db/mysql")

const getList = (author, keyword) => {
  
  // 先返回假数据（格式是正确的）
  // Date.now()
  // where 1=1 永成立
  let sql = `select * from blogs where state=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  // 返回promise
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0]
  })
  
}

const newBlog = (blogData = {}) => {

  // blogData 是一个博客对象， 包含title content属性

  const title = xss(blogData.title)
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()
  
  const sql = `
    insert into blogs (title, content, author, createtime, state) 
    values ('${title}', '${content}', '${author}', '${createtime}', 1);
  `
  return exec(sql).then(insertData => {
    // console.log('insertData is ', insertData)
    return {
      id: insertData.insertId
    }
  })

}

const updateBlog = (id, blogData = {}) => {

  // id 就是要更新博客的id
  // blogData 是一个博客对象， 包含title content属性
  const title = blogData.title
  const content = blogData.content

  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}';
  `

  return exec(sql).then(updateData => {
    // console.log('updateData is ', updateData)
    if (updateData.affectedRows > 0) {
      return true
    } 
    return false
  })

}

const delBlog = (id, author) => {

  // id 就是要更新博客的id
  const sql = `
    update blogs set state='0' where id='${id}' and author='${author}';
  `
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    } 
    return false
  })
  
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}