// articleAPI.js 라우터으 기본주소는
// app.js에서 http://localhost:3000/api/articles로 설정해줍니다.

var express = require("express");
var router = express.Router();
/*
- 전체 게시글 목록 데이터 요청과 응답처리 라우팅메소드
- 호출주소 : http://localhost:3000/api/articles
- 호출방식 : GET
- 응답결과 : 게시글 Json 데이터 목록
*/
// router.get('호출주소', 콜백함수());
// async(req, res)=>{} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그래밍이 가능합니다.
router.get("/list", async (req, res) => {
  let apiResult = {
    code: 403,
    data: null,
    result: "Result",
  };

  try {
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
        regist_date: Date.now(),
      },
      {
        article_id: 2,
        title: "게시글2 제목입니다.",
        contents: "게시글2 내용입니다.",
        display: 0,
        view_cnt: 8,
        ip_address: "172.2.2.2",
        regist_id: 2,
        regist_date: Date.now(),
      },
      {
        article_id: 3,
        title: "게시글3 제목입니다.",
        contents: "게시글3 내용입니다.",
        display: 1,
        view_cnt: 24,
        ip_address: "172.3.3.3",
        regist_id: 3,
        regist_date: Date.now(),
      },
    ];

    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.result = "Ok";
  } catch (error) {
    apiResult.code = 500;
    apiResult.data = null;
    (apiResult.result = "Failed Server Error 관리자에게 문의하세요."),
      error.message;
  }

  // 서버응답결과물로 순수 Json 데이터를 반환한다.
  // res.json(json데이터);
  res.json(apiResult);
});

/*
- 단일 신규 게시글 정보 등록 요청과 응답처리 라우팅메소드
- 호출주소 : http://localhost:3000/api/articles
- 호출방식 : POST 
- 응답결과 : 등록처리된 단일게시글 정보 반환
*/
// router.get('호출주소', 콜백함수());
// async(req, res)=>{} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그래밍이 가능합니다.
router.post("/create", async (req, res) => {
  let apiResult = {
    code: 403,
    data: null,
    result: "Result",
  };

  try {
    // Step1: 클라이언트에서 보내준 사용자 입력 json데이터를 추출합니다.
    // req.body 클라이언트에서 보내준 단일 게시글 json 객체의 속성명
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    // Step2: 사용자 json 데이터를 DB 게시글 테이블에 저장합니다.
    // DB의 게시글 테이블에 저장할 Json 단일 데이터
    const article = {
      title: title,
      contents: contents,
      display: display,
      view_cnt: 0,
      ip_address: "172.192.0.0.1",
      regist_id: 1,
      regist_date: Date.now(),
    };
    // Step3: DB에 저장반환된 등록된 게시글 신규 게시글정보가 반환됩니다.
    const dbArticle = {
      article_id: 1,
      title: title,
      contents: contents,
      display: display,
      view_cnt: 1,
      ip_address: "172.192.0.0.1",
      regist_id: 1,
      regist_date: Date.now(),
    };

    apiResult.code = 200;
    apiResult.data = dbArticle;
    apiResult.result = "Ok";
  } catch (error) {
    // try {} 블록 스코프에서 백엔드 에러가 발생하면 catch(error) {} 블럭으로 에러 내용이 전달됩니다.
    apiResult.code = 500;
    apiResult.data = null;
    (apiResult.result = "Server Error!"), error.message;
  }
  // Step4: DB에 저장되고 반환된 단일게시글 정보를 클라이언트에 반환합니다.
  // HTTPResponse객체의 json('json데이터')메소드는 서버에서 웹브라우저로 json데이터를 반환합니다.
  res.json(apiResult);
});

module.exports = router;
