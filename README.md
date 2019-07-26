### 博客接口设计
|描述 | 接口 | 方法 | url参数 | 备注|
|  :- | :-: | :-: | :-: | -: |
| 获取博客列表 | /api/blog/list | get | author作者，keyword搜索关键字 | 参数为空的话，则不进行查询过滤|
| 获取一篇博客的内容 | /api/blog/detail | get | id | |
| 新增一篇博客 | /api/blog/new | post |  | postData中有新增的信息 |
| 更新一篇博客 | /api/blog/update | post | id | postData中有更新的内容|
| 删除一篇博客 | /api/blog/del | post | id | |
| 登录 | /api/blog/login | post | | postData中有用户名和密码|

- 服务器端口localhost:3001
- 前端服务端口localhost:3002 (http-server)
- nginx反向代理localhost:8080

