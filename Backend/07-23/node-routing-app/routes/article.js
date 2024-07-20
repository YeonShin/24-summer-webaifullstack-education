// 각종 게시글 정보관리 웹페이지 요청과 응덥처리 전용 라우터 파일
// article.js 라우터 파일의 기본 주소체계는 app.js 내에서 http://localhost:3000/article로 정의할 예정

// express 객체를 참조합니다.
var express = require('express');

// 각종 요청과 응답처리를 위한 라우터 객체 생성하기
var router = express.Router();

// 게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 정의
router.get('/list', function(req, res) {
    res.render('article/list.ejs');
});

// 반드시 라우터파일의 라우터 객체를 exports로 노출해야 app.js에서 router내의 라우팅 규칙을 실행할 수 있습니다.
module.exports = router;