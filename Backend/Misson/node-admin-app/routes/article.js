var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
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

    res.render('article/list.ejs', {articles});
});

router.get("/create", function(req, res) {
    res.render('article/create.ejs');
});

router.post('/create', function(req, res) {
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    const article = {
        title: title,
        contents: contents,
        display: display,
        ip_address: "192.172.0.1",
        view_cnt: 0,
        regist_id: 1,
        regist_date: Date.now()
    };

    // Step3: DB 게시글 테이블에 상기 article 데이터 등록처리
    // DB서버에서 Insert SQL구문을 통해서 DB등록처리가 되면 등록된 실제 데이터셋을 다시 반환함
    const registedArticle = {
        article_id: 1,
        title,
        contents: contents,
        display,
        ip_address: "192.172.0.1",
        view_cnt: 0,
        regist_id: 1,
        regist_date: Date.now()
    }; 

    res.redirect('/article/list');
});

router.post("/modify", async(req, res) => {
    const articleId = req.body.article_id;
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    const article = {
        title: title,
        contents: contents,
        display: display,
        ip_address: "192.172.0.1",
        modify_id: 1,
        modify_date: Date.now()
    };

    // Step3: DB 게시글 테이블에 상기 article 데이터 등록처리
    // DB서버에서 Insert SQL구문을 통해서 DB등록처리가 되면 등록된 실제 데이터셋을 다시 반환함
    // UPDATE article SET title='수정한제목', cotents='수정한내용', display="게시여부값", modify_id= 1, modify_date='2024-07-25 18:08:12' WHERE article_id=1;
    const registedArticle = {
        title: title,
        contents: contents,
        display: display,
        ip_address: "192.172.0.1",
        modify_id: 1,
        modify_date: Date.now()
    }; 

    res.redirect("/article/list");
});

router.get("/delete", async (req, res) => {
    const articleIndex = req.query.aid;

    res.redirect("/article/list");
})

router.get("/modify/:id", async (req, res) => {
    const articleId = req.params.id;

    const article = {
        article_id: 1,
        title: "게시글1 제목입니다.",
        contents: "게시글1 내용입니다.",
        display: 1,
        view_cnt: 12,
        ip_address: "172.1.1.0",
        regist_id: 1,
        regist_date: Date.now(),
    };

    res.render("article/modify.ejs", {article});
});



module.exports = router;