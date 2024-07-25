var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 게시글 정보처리 전용 RESTful API 라우터 참조하기
var articleAPIRouter = require("./routes/api/articleAPI");

// 노드 앱 객체 정의
var app = express();

// // 노드 앱에 추가하고 싶은 기능 정의
// app.use(function(req, res, next) {
//   // 여기 모든 사용자 요청이 있을때마다 실행할 기능을 정의 해야함
//   console.log("전역 애플리케이션 미들웨어 함수가 호출되었습니다.", Date.now());
//   // 원래 사용자가 요청했던 똫는 응답해야하는 다음프로세스로 흘러가게한다.
//   // next() 미들웨어를 진행
//   next();
// })

// 특정 호출주소에 대한 미들웨어 기능구현
// 사용자가 특정 주소를 요청해오면 해당 주소를 분석해 관련 응답을 미들웨어에서 매번 처리
app.use('/user/:id', function(req, res, next) {
  const uid = req.params.id;
  if (uid == "eddy") {
    console.log("현재 애디 사용자에 대한 정보가 요청되었습니다.");
    res.send("당신은 시스템에 접근할 수 없는 사용자입니다.");
  }
  
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// articleAPIRouter의 기본 호출주소 체계 정의하기
// http://localhost:3000/api/articles
app.use('/api/articles', articleAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
