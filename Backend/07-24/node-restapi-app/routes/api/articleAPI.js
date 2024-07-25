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

/*
- 단일 기존 게시글 정보 조회 요청과 응답처리 라우팅메소드 - 쿼리스트링 방식
- 호출주소 : http://localhost:3000/api/articles?aId=1
- 호출방식 : GET 
- 응답결과 : 단일게시글 정보 Json 반환
*/
// router.get('호출주소', 콜백함수());
// async(req, res)=>{} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그래밍이 가능합니다.
router.get("/", async(req, res) => {

  // API 호출 결과 표준 데이터 포맷 정의
  let apiResult = {
    code:200,
    data:null,
    result:""
  }

  try {
    // Step1: API URL 주소에서 게시글 번호를 추출한다. (QueryString 방식)
    // 쿼리스트링방식으로 전달되는 키값은 req.query.키명으로 추출가능하다.
    const articleIdx = req.query.aid;
    
    // Step2: 해당 게시글번호를 기준으로  DB 게시글 테이블에서 단일게시글 정보를 조회한다.
    const article = {
      article_id: "1",
      title: "제목1 입니다",
      contents: "내용1 입니다",
      display: 1,
      view_cnt: 12,
      ip_address: "192.172.1.1",
      regist_id: 1,
      regist_date: Date.now()
    }

    apiResult.code = 200;
    apiResult.data = article;
    apiResult.result = "Ok";

  } catch (err) {
    console.log("실제 서버에러 확인하기", err.message);
    // 백엔드에서 에러가 난 사실을 서버에 물리적 로그폴더를 만들고 로그.txt(.log) 파일에 기록하면
    // 좀 더 적극적으로 서버에러에 대해 대응이 가능합니다.

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed Server Error!";
  }

  // Step3: 단일게시글 정보를 웹브라우저/클라이언트 응답결과물로 반환한다.
  res.json(apiResult);
});



/*
- 기존 단일 게시글 수정처리 요청과 응답처리 라우팅메소드
- 호출주소 : http://localhost:3000/api/articles/modify
- 호출방식 : POST
- 응답결과 : 단일게시글 정보 수정 결과 Json 반환
*/
router.post("/modify", async (req, res) => {
  let apiResult = {
    code: 200,
    data: null,
    result: "",
  };

  try {
    // Step1: 클라이언트에서 보내준 사용자 수정 json데이터를 추출합니다.
    // req.body 클라이언트에서 보내준 단일 게시글 json 객체의 속성명
    const article_id = req.body.article_id;
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    // Step2: 사용자가 보내준 속성만 해당 DB 게시글 테이블의 컬럼값으로 수정합니다.
    // DB의 게시글 테이블에 수정할 Json 단일 데이터 속성 정의
    const article = {
      title: title,
      contents: contents,
      display: display,
      ip_address: "172.192.0.0.1",
      modify_id: 1,
      modify_date: Date.now()
    };
    // DB 게시글 테이블에 상기 데이터를 저장한다
    // 수정하면 DB에 저장된 게시글 정보가 다시 반환됨(게시글 번호가 포함)
    // Step3: 수정된 건수를 data 값으로 지정해주고 프론트에 수정된건수를 전달한다.

    apiResult.code = 200;
    apiResult.data = 1; // 실제 DB 서버에서 제공된 수정적용건수
    apiResult.result = "Ok";
  } catch (error) {
    // try {} 블록 스코프에서 백엔드 에러가 발생하면 catch(error) {} 블럭으로 에러 내용이 전달됩니다.
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = "Server Error!", error.message;
  }
  // Step4: DB에 저장되고 반환된 단일게시글 정보를 클라이언트에 반환합니다.
  // HTTPResponse객체의 json('json데이터')메소드는 서버에서 웹브라우저로 json데이터를 반환합니다.
  res.json(apiResult);
});

/*
- 기존 단일 게시글 삭제처리 요청과 응답처리 라우팅메소드 - GET 방식
- 호출주소 : http://localhost:3000/api/articles/delete?aid=1
- 호출방식 : GET
- 응답결과 : 단일게시글 정보 삭제 결과 Json 반환
*/
router.get("/delete", async(req, res) => {
  let apiResult = {
    code: 200,
    data: null,
    result: "",
  };

  try {
    // Step1: URL 에서 삭제할 게시글 번호를 추출한다.
    const articleIdx = req.query.aid;

    // Step2: DB 테이블에서 해당 게시글을 삭제처리한다.

    // Step3: DB 서버에서 특정 데이터가 삭제되면 삭제건수가 백엔드로 반환된다.
    const deleteCount = 1;

    apiResult.code = 200;
    apiResult.data = deleteCount;
    apiResult.result = "Ok";

  } catch (err) {
    // try {} 블록 스코프에서 백엔드 에러가 발생하면 catch(error) {} 블럭으로 에러 내용이 전달됩니다.
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = "Server Error!", error.message;
  }

  res.json(apiResult);
});

/*
- 기존 단일 게시글 삭제처리 요청과 응답처리 라우팅메소드 - POST 방식
- 호출주소 : http://localhost:3000/api/articles/delete?aid=1
- 호출방식 : POST
- 응답결과 : 단일게시글 정보 삭제 결과 Json 반환
*/
router.post("/delete", async(req, res) => {
  let apiResult = {
    code: 200,
    data: null,
    result: "",
  };

  try {
    // Step1: URL 에서 삭제할 게시글 번호를 추출한다.
    const articleIdx = req.query.aid;

    // Step2: DB 테이블에서 해당 게시글을 삭제처리한다.

    // Step3: DB 서버에서 특정 데이터가 삭제되면 삭제건수가 백엔드로 반환된다.
    const deleteCount = 1;

    apiResult.code = 200;
    apiResult.data = deleteCount;
    apiResult.result = "Ok";

  } catch (err) {
    // try {} 블록 스코프에서 백엔드 에러가 발생하면 catch(error) {} 블럭으로 에러 내용이 전달됩니다.
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = "Server Error!", error.message;
  }

  res.json(apiResult);
});

/*
- 단일 기존 게시글 정보 조회 요청과 응답처리 라우팅메소드 - 파라미터 방식
- 호출주소 : http://localhost:3000/api/articles/1
- 호출방식 : GET 
- 응답결과 : 단일게시글 정보 Json 반환
*/
// router.get('호출주소', 콜백함수());
// async(req, res)=>{} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그래밍이 가능합니다.
router.get("/:aid", async(req, res) => {

  // API 호출 결과 표준 데이터 포맷 정의
  let apiResult = {
    code:200,
    data:null,
    result:""
  }

  try {
    // Step1: API URL 주소에서 게시글 번호를 추출한다. (파라미터 방식)
    // 파라미터 방식으로 전달되는 키값은 와일드 카드(:aid) 키값을 이용해 req.params.와일드 카드키명으로 추출가능하다.
    const articleIdx = req.params.aid;
    
    // Step2: 해당 게시글번호를 기준으로  DB 게시글 테이블에서 단일게시글 정보를 조회한다.
    const article = {
      article_id: "1",
      title: "제목1 입니다",
      contents: "내용1 입니다",
      display: 1,
      view_cnt: 12,
      ip_address: "192.172.1.1",
      regist_id: 1,
      regist_date: Date.now()
    }

    apiResult.code = 200;
    apiResult.data = article;
    apiResult.result = "Ok";

  } catch (err) {
    console.log("실제 서버에러 확인하기", err.message);
    // 백엔드에서 에러가 난 사실을 서버에 물리적 로그폴더를 만들고 로그.txt(.log) 파일에 기록하면
    // 좀 더 적극적으로 서버에러에 대해 대응이 가능합니다.

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed Server Error!";
  }

  // Step3: 단일게시글 정보를 웹브라우저/클라이언트 응답결과물로 반환한다.
  res.json(apiResult);
});

module.exports = router;
