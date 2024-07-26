var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
    const admins = [
        {
            adminIndex : 1,
            adminId: "test",
            adminPassword: "1234",
            adminName: "aaa",
            adminIntroduce: "abcdefg",
            usage: 1,
            regist_date: Date.now()
        },
        {
            adminIndex : 2,
            adminId: "test",
            adminPassword: "5678",
            adminName: "bbb",
            adminIntroduce: "abcdefg",
            usage: 0,
            regist_date: Date.now()
        },
        {
            adminIndex : 3,
            adminId: "test",
            adminPassword: "91011",
            adminName: "ccc",
            adminIntroduce: "abcdefg",
            usage: 1,
            regist_date: Date.now()
        }
    ];

    res.render('admin/list.ejs', {admins});
});

router.get("/create", function(req, res) {
    res.render('admin/create.ejs');
});

router.post('/create', function(req, res) {
    const adminId = req.body.adminId;
    const adminPassword = req.body.adminPassword;
    const adminName = req.body.adminName;
    const adminIntroduce = req.body.adminIntroduce;

    const adminInfo = {
        adminIndex: 1,
        adminId: adminId,
        adminPassword: adminPassword,
        adminName: adminName,
        adminIntroduce: adminIntroduce,
        regist_date: Date.now()
    };

    res.redirect('/admin/list');
});

router.post("/modify", async(req, res) => {
    const adminId = req.body.article_adminId;
    const adminName = req.body.adminName;
    const adminIntroduce = req.body.adminIntroduce;
    const usage = req.body.usage;

    const article = {
        adminId: adminId,
        adminName: adminName,
        adminIntroduce: adminIntroduce,
        usage: usage,
        modify_id: 1,
        modify_date: Date.now()
    };

    // Step3: DB 게시글 테이블에 상기 article 데이터 등록처리
    // DB서버에서 Insert SQL구문을 통해서 DB등록처리가 되면 등록된 실제 데이터셋을 다시 반환함
    // UPDATE article SET title='수정한제목', cotents='수정한내용', display="게시여부값", modify_id= 1, modify_date='2024-07-25 18:08:12' WHERE article_id=1;
    const registedArticle = {
        adminId: adminId,
        adminName: adminName,
        adminIntroduce: adminIntroduce,
        usage: usage,
        modify_id: 1,
        modify_date: Date.now()
    }; 

    res.redirect("/admin/list");
});

router.get("/delete", async (req, res) => {
    const adminIndex = req.query.aid;

    res.redirect("/admin/list");
})

router.get("/modify/:id", async (req, res) => {
    const adminIndex = req.params.id;

    const admin = {
        adminIndex: adminIndex,
        adminId: "test", 
        adminName: "kim",
        adminIntroduce: "abcdefg",
        usage: 1,
        regist_date: Date.now()
    }

    res.render("admin/modify.ejs", {admin});
});



module.exports = router;