const express = require('express');
const path = require('path');
const fs = require("fs")
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require("express-session")
const RedisStore = require("connect-redis")(session)

const blogRouter = require("./routes/blog")
const userRouter = require("./routes/user")

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

const ENV = process.env.NODE_ENV
if (ENV !== "production") {
  // 开发环境 / 测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, "logs", "access.log")
  const writeStream = fs.createWriteStream(logFileName, {
    flags: "a"
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require("./db/redis")
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(session({
  secret: "WJiol#23123",
  cookie: {
    // path: "/",  // 默认配置
    // httpOnly: true,  // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

// 路由注册
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
