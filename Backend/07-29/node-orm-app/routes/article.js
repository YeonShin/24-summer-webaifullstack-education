var express = require('express');
var router = express.Router();

var db = require("../models/index");

// 전체 목록조회
router.get("/list", async(req, res) => {
    const articles = await db.Article.findAll();

    res.render("article/list.ejs", {articles});
});

// 신규 게시글 등록 페이지
router.get('/create', async(req, res) => {
    res.render("article/create.ejs");
});

// 신규 게시글 등록 처리
router.post('/create', async(req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    const display_code = req.body.display;

    const article = {
        board_type_code: 2,
        title: title,
        article_type_code: 0,
        contents: contents,
        view_count: 0,
        ip_address: "172.0.0.1",
        is_display_code: display_code,
        reg_date: Date.now(),
        reg_member_id: 1
    };

    // create() 메소드는 ORM Framework에 의해서 INSERT INTO article()values() 쿼리로 변환되어
    // DB 서버에 전송되어 DB서버에서 실행되고 실제 저장된 단일 게시글 DATA를 DB서버에서 반환한다.
    const registArticle = await db.Article.create(article);

    res.redirect("/article/list");
});

// 단일 게시글 수정처리
router.post('/modify', async(req, res) => {
    const articleIdx = req.body.article_id;

    const title = req.body.title;
    const contents = req.body.contents;
    const display_code = req.body.display;

    // 주의:중요! 수정할 컬럼과 값만 저장하고 컬럼의 속성은 article.js모델의 속성명과 일치해야한다.

    const article = {
        title:title,
        contents:contents,
        is_display_code: display_code,
        ip_address: "192.255.255.255",
        edit_date: Date.now(),
        edit_member_id: 1
    };

    const modifyArticle = await db.Article.update(article, {where:{article_id:articleIdx}});

    res.redirect("/article/list");
});

// 단일 게시글 삭제처리
router.get('/delete', async(req, res) => {
    const articleIdx = req.query.id;
    const deletedCnt = await db.Article.destroy({where:{article_id:articleIdx}});
    res.redirect("/article/list");
});

// 단일 게시글 정보 조회
router.get('/modify/:id', async(req, res) => {
    // db에서 해당 게시글 번호와 일치하는 단일 게시글 정보 조회
    const articleIdx = req.params.id;

    const article = await db.Article.findOne({where: {article_id:articleIdx}});

    res.render("article/modify.ejs", {article});
});

module.exports = router;