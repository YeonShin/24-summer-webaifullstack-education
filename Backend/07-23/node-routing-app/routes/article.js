// 각종 게시글 정보관리 웹페이지 요청과 응덥처리 전용 라우터 파일
// article.js 라우터 파일의 기본 주소체계는 app.js 내에서 http://localhost:3000/article로 정의할 예정

// express 객체를 참조합니다.
var express = require('express');

// 각종 요청과 응답처리를 위한 라우터 객체 생성하기
var router = express.Router();

// 게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 정의 
// 요청주소: http://localhost:3000/artice/list
// router.get()라우팅메소드는 클라이언트에서 get방식으로 요청해야함
// 클라이언트에 get방식으로 요청하는 방법:하나:브라우저주소창에 url직접찍는경우..
// <a href="/article/list">링크태크를 사용자가 클릭한경우
// router.get('호출주소쳬계',서버응답처리전용콜백함수());
// router.post('호출주소쳬계',서버응답처리전용콜백함수());
// router.put('호출주소쳬계',서버응답처리전용콜백함수());
// router.patch('호출주소쳬계',서버응답처리전용콜백함수());
// router.delete('호출주소쳬계',서버응답처리전용콜백함수());
router.get('/list', function(req, res) {
    //콜백함수(req,res,next);
    //콜백함수(req=요청=HttpRequest객체=클라이언트/웹브라우저에서 서버로 전달되는 모든정보제공객체)
    //콜백함수(res=응답=HttpResponse객체=서버에서 클라이언트/웹브라우저로 응답처리하고 그 결과를 보내는 객체)
    //콜백함수(next= 미들웨어로 콜백처리후에 진행할 흐름제어 객체)

    //res.render('특정뷰파일경로'): 특정지정뷰파일의 내용을 웹브라우저로 전달하는 메소드
    //views폴더아래 article폴더아래 list.ejs파일을 웹브라우저로 전달한다. 
    //res.render('뷰파일경로',해당지정뷰에 전달할 DATA(JSONData))
    res.render('article/list.ejs');
});

// 게시글 등록 웹페이지 요청과 응답처리 라우팅메소드
// 요청주소: http://localhost:3000/article/create
// 클라이언트 요청방식: Get방식
// 응답형식: 게시글 등록 웹페이지(뷰파일)
router.get('/create', function(req, res){
    res.render("article/create.ejs");
});


// 게시글 등록페이지에서 폼방식으로 전달해준 사용자 입력 게시글정보를 추출해
// DB에 저장처리하는 라우팅메소드 구현
// 요청주소: http://localhost:3000/article/create
// 클라이언트 요청방식: Post 방식
// ** 서버측 라우팅 메소드는 호출주소URL과 클라이언트 요청방식이 둘다 동일해야 해당 라우팅메소드가 실행됨 */
router.post("/create", function(req, res) {

    
    // Step1: 사용자 게시글 등록폼태그내 입력/선택 값 추출하기
    // 사용자 입력폼내 입력/선택 html요소태그의 값을 추출하려면
    // req.body.html태그요소의 name 속성값을 이용해 추출합니다. 
    // req=HttpRequest객체=요청정보 담고 있는 클라이언트/웹브라우저에서 서버로 전달되는 모든정보를 담고있는객체
    const title = req.body.ctitle;
    const contents = req.body.contents;
    const display = req.body.display;

    // Step2: DB에 저장한 JSON  데이터 생성하기
    // 객체의 속성명과 속성에 할당되는 변수명이 같으면 변수명은 생략가능하다.
    const article = {
        title:title,
        contents:contents,
        display:display,
        view_cnt:0,
        ipaddress: "1111.111.1.1.1",
        regist_date: Date.now(),
        regist_id:1
    }

    // Step3: DB 에 관련 게시글 테이블에 데이터를 저장한다.

    // Step4: 사용자 웹브라우저를 게시글 목록페이지로 바로 이동시키기
    // res.redirect('이동시키고자하는 URL 주소'); 
    res.redirect("/article/list");


});

router.post('/delete', function(req, res) {
    // Step1: 삭제할 게시글 고유번호 추출하기
    const articleIdx = req.body.article_id;

    // Step2: DB 게시글 테이블에서 해당 게시글 번호로 단일게시글 정보를 영구 삭제한다

    // Step3: 삭제 처리후 목록 페이지로 이동시키기

    res.redirect('/article/list');

})

// 게시글 확인 및 수정 웹페이지 요청과 응답처리 라우팅 메소드
// http://localhost:3000/article/modify
// 클라이언트 요청방식 : GET 방식
// 응답형식: 단일 게시글 정보 확인 웹페이지(뷰파일)
router.get("/modify", function(req, res) {

    //URL 주소를 통해 데이터를 전달하는 방법 2가지
    // 1)QueryString 방식 : url주소ㅛ에 ?키1=값&키2=값&키3=값
    // Step1: URL 주소에서 게시글 고유번호를 추출한다.
    // 쿼리스트링방식으로 전달되는 키 값은 req.query.키명으로 추출한다.
    const articleIdx = req.query.id;

    // Step2 : 해당 게시글 번호를 이용해 DB 게시글 테이블에서 단일 게시글 정보를 조회해온다.
    // 2) 파라미터 방식: url주소 내에 데이터를 포함시키는 방식
    const article = {
        article_id: 1,
        title: "웹퍼브,ㄹ리셔의 ㅇ버무가 궁금해요요",
        contents: "웹퍼블리셔으 ㅣ주요엄부 2가지 웹표준준수준코딩, 웹전근선중수, 반응형웹페이지가ㅜ현, 블라ㅣㅂ라",
        display: 1,
        view_cnt: 121,
        regist_date : "2024-07-23",
        regist_id: 1
    }

    // 지정된 뷰파일에 단일게시글 데이터를 article이라는 속성명으로 전달한다.
    res.render("article/modify.ejs", {article});
    // 객체의 속성명과 속성명의 값변수값이 동일하면 변수명은 생략
    // res.render('article/modify.ejs", {article:article})
});


// *** 라우팅 메소드 구현 시 가장 중요한 점 : 와일드 카드 키로 구현된 라우팅메소드는 모든 라우팅메소드의 최하단에 위치할 것
// 기존 게시글 정보에 대해 사용자가 수정한 폼정보를 이용해
// 수정 데이터를 폼에서 추출하고 추출한 수정정보를 기반으로 DB에 저장되어 있던 기존 데이터를 수정처리 후에 목록페이지로 이동시킬지 말지 결정한다.
// 관리자 웹사이트 특성상 목록페이지로 그냥 이동시켜버린다.
// 요청주소: http://localhost:3000/article/modify/1
// 클라이언트 요청방식 : POST 방식
// 응답형식: 웹브라우저 주소를 목록페이지로 이동시킴 ...res.redirect('이동시킬url주소');

router.post('/modify/:id', function(req, res) {
    // URL 파라미터 방식으로 데이터를 전달하는 경우 해당 데이터를 url에서 추출하는 방법
    // 먼저 라우팅 주소에 와일드카드 키를 설정한다. /modify/:id :id가 와일드카드 키

    // Step1: 게시글 고유번호를 추출한다. :와일드카드 키명으로 파라미터 값 추출하기
    // 파라미터 방식으로 url을 통해 데이터를 전달하는 경우 req.params.와일드카드키명으로 값을 추출한다.
    const articleIdx = req.params.id;

    // Step2: 사용자가 수정한 HTML요소의 수정 값을 추출하기
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    // Step3: DB 게시글 정보 수정을 위한 Json 수정데이터 생성하기
    const article = {
        title: title,
        contents: contents,
        display: display
    };

    // Step4: DB에 해당 단일 게시글에 대해 상기 수정데이터로 데이터를 수정처리한다.

    // 수정 작업이 끝나면 목록페이지로 이동시키거나 특정 뷰파일을 보내준다.(res.rendedr(...))
     res.redirect('/article/list');
})



// 반드시 라우터파일의 라우터 객체를 exports로 노출해야 app.js에서 router내의 라우팅 규칙을 실행할 수 있습니다.
module.exports = router;