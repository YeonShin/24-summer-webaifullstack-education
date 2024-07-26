var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
    const members = [
        {
            memberIndex : 1,
            memberId: "test",
            memberPassword: "1234",
            memberName: "aaa",
            memberIntroduce: "abcdefg",
            usage: 1,
            regist_date: Date.now()
        },
        {
            memberIndex : 3,
            memberId: "tasdest",
            memberPassword: "123asdsd4",
            memberName: "aaasdasda",
            memberIntroduce: "abcdeasdfg",
            usage: 0,
            regist_date: Date.now()
        },
        {
            memberIndex : 2,
            memberId: "test",
            memberPassword: "1234",
            memberName: "aaa",
            memberIntroduce: "abcdefg",
            usage: 1,
            regist_date: Date.now()
        }
    ];

    res.render('member/list.ejs', {members});
});


router.post("/modify", async(req, res) => {
    const memberId = req.body.memberId;
    const memberName = req.body.memberName;
    const memberIntroduce = req.body.memberIntroduce;
    const usage = req.body.usage;

    const member = {
        memberId: memberId,
        memberName: memberName,
        memberIntroduce: memberIntroduce,
        usage: usage,
        modify_id: 1,
        modify_date: Date.now()
    };

    // Step3: DB 게시글 테이블에 상기 article 데이터 등록처리
    // DB서버에서 Insert SQL구문을 통해서 DB등록처리가 되면 등록된 실제 데이터셋을 다시 반환함
    // UPDATE article SET title='수정한제목', cotents='수정한내용', display="게시여부값", modify_id= 1, modify_date='2024-07-25 18:08:12' WHERE article_id=1;
    const registedMember = {
        memberId: memberId,
        memberName: memberName,
        memberIntroduce: memberIntroduce,
        usage: usage,
        modify_id: 1,
        modify_date: Date.now()
    }; 

    res.redirect("/member/list");
});

router.get("/delete", async (req, res) => {
    const memberIndex = req.query.aid;

    res.redirect("/member/list");
})

router.get("/modify/:id", async (req, res) => {
    const memberIndex = req.params.id;

    const member = {
        memberIndex: memberIndex,
        memberId: "test", 
        memberName: "kim",
        memberIntroduce: "abcdefg",
        usage: 1,
        regist_date: Date.now()
    }

    res.render("member/modify.ejs", {member});
});



module.exports = router;