var express = require("express");
var router = express.Router();

//관리자 암호를 단방향암호화(해시알고리즘) 하기위해 bcryptjs패키지 참조하기 
var bcrypt = require('bcryptjs');

//ORM DB객체를 참조합니다.
var db = require("../models/index.js");

/* GET home page. */
router.get("/", function (req, res, next) {

  res.render("index", { title: "관리자 페이지" });
});

router.get("/login", async (req, res) => {
  let resultMsg = {
    code:400,
    msg:""
  }

  res.render("login.ejs", { layout: false, resultMsg });
});

router.post("/login", async (req, res) => {
  // 아이디/암호가 일치하지 않은 경우 다시 로그인 뷰를 전달하고
  // 로그인뷰에 결과메시지 데이터를 전달합니다.
  let resultMsg = {
    code:400,
    msg:""
  }

  // Step1: 관리자 아이디/암호를 추출한다.
  const admin_id = req.body.admin_id;
  const admin_password = req.body.admin_password;

  // Step2: 동일한 관리자 아이디 정보를 조회합니다.

  // Step3: DB저장 암호의 관리자 입력 암호를 체크합니다.

  const admin = await db.Admin.findOne({ where: { admin_id: admin_id } });

  if (admin) {
    // db 저장된 암호와 관리자가 로그인 화면에서 입력한 암호가 일치하는지 체크
    if (bcrypt.compare(admin_password, admin.admin_password)) {
      // Step4: 아이디/암호가 일치하면 메인페이지로 이동시키고
      // 그렇지 않으면 처리결과 data를 login.ejs에 전달합니다.
      res.redirect('/main');
    } else {
      // 암호가 일치하지 않은 경우
      resultMsg.code = 402;
      resultMsg.msg = "암호가 존재하지 않습니다.";
      res.render("login.ejs", {layout:false, resultMsg});
    }
  } else {
    // 동일한 아이디가 없는 경우
    resultMsg.code = 401;
    resultMsg.msg = "아이디가 존재하지 않습니다.";
    res.render("login.ejs", {layout:false, resultMsg});
  }
});

router.get("/main", async (req, res) => {
  res.render("main.ejs", { layout: false });
});

module.exports = router;
