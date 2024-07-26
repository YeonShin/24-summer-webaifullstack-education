var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
    const channels = [
        {
            channelIndex : 1,
            channelId: "test",
            channelPassword: "1234",
            channelName: "aaa",
            channelIntroduce: "abcdefg",
            usage: 1,
            regist_date: Date.now()
        },
        {
            channelIndex : 2,
            channelId: "test",
            channelPassword: "5678",
            channelName: "bbb",
            channelIntroduce: "abcdefg",
            usage: 0,
            regist_date: Date.now()
        },
        {
            channelIndex : 3,
            channelId: "test",
            channelPassword: "91011",
            channelName: "ccc",
            channelIntroduce: "abcdefg",
            usage: 1,
            regist_date: Date.now()
        }
    ];

    res.render('channel/list.ejs', {channels});
});

router.get("/create", function(req, res) {
    res.render('channel/create.ejs');
});

router.post('/create', function(req, res) {
    const channelId = req.body.channelId;
    const channelPassword = req.body.channelPassword;
    const channelName = req.body.channelName;
    const channelIntroduce = req.body.channelIntroduce;

    const channelInfo = {
        channelIndex: 1,
        channelId: channelId,
        channelPassword: channelPassword,
        channelName: channelName,
        channelIntroduce: channelIntroduce,
        regist_date: Date.now()
    };

    res.redirect('/channel/list');
});

router.post("/modify", async(req, res) => {
    const channelId = req.body.channel_channelId;
    const channelName = req.body.channelName;
    const channelIntroduce = req.body.channelIntroduce;
    const usage = req.body.usage;

    const channel = {
        channelId: channelId,
        channelName: channelName,
        channelIntroduce: channelIntroduce,
        usage: usage,
        modify_id: 1,
        modify_date: Date.now()
    };

    // Step3: DB 게시글 테이블에 상기 channel 데이터 등록처리
    // DB서버에서 Insert SQL구문을 통해서 DB등록처리가 되면 등록된 실제 데이터셋을 다시 반환함
    // UPDATE channel SET title='수정한제목', cotents='수정한내용', display="게시여부값", modify_id= 1, modify_date='2024-07-25 18:08:12' WHERE channel_id=1;
    const registedChannel = {
        channelId: channelId,
        channelName: channelName,
        channelIntroduce: channelIntroduce,
        usage: usage,
        modify_id: 1,
        modify_date: Date.now()
    }; 

    res.redirect("/channel/list");
});

router.get("/delete", async (req, res) => {
    const channelIndex = req.query.aid;

    res.redirect("/channel/list");
})

router.get("/modify/:id", async (req, res) => {
    const channelIndex = req.params.id;

    const channel = {
        channelIndex: channelIndex,
        channelId: "test", 
        channelName: "kim",
        channelIntroduce: "abcdefg",
        usage: 1,
        regist_date: Date.now()
    }

    res.render("channel/modify.ejs", {channel});
});



module.exports = router;