// articleAPI.js 라우터으 기본주소는
// app.js에서 http://localhost:3000/api/articles로 설정해줍니다.

var express = require('express');
const { get } = require('request');
var router = express.Router();
/*
- 전체 게시글 목록 데이터 요청과 응답처리 라우팅메소드
- 호출주소 : http://localhost:3000/api/articles
- 호출방식 : Get 
- 응답결과 : 게시글 Json 데이터 목록
*/
// router.get('호출주소', 콜백함수());
// async(req, res)=>{} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그래밍이 가능합니다.
router.get('/list', async(req, res) => {

    // DB 게시글 테이블에서 전체 게시글 목록을 가져왔다고 가정합니다.
    // 가져온 데이터가 아래와 같음
    const articles = [
        {
            article_id: 1,
            title: "게시글1 제목입니다.",
            contents: "게시글1 내용입니다.",
            display: 1,
            view_cnt: 12,
            ip_address: "172.1.1.0",
            regist_id: 1,
            regist_date: Date.now()
        },
        {
            article_id: 2,
            title: "게시글2 제목입니다.",
            contents: "게시글2 내용입니다.",
            display: 0,
            view_cnt: 8,
            ip_address: "172.2.2.2",
            regist_id: 2,
            regist_date: Date.now()
        },
        {
            article_id: 3,
            title: "게시글3 제목입니다.",
            contents: "게시글3 내용입니다.",
            display: 1,
            view_cnt: 24,
            ip_address: "172.3.3.3",
            regist_id: 3,
            regist_date: Date.now()
        },
    ];
    // 서버응답결과물로 순수 Json 데이터를 반환한다.
    // res.json(json데이터);
    res.json(articles);
});

module.exports = router;