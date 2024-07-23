var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '관리자 페이지' });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
  const userId = req.body.userid;
  const password = req.body.password;

  const userInfo = {
    userId : userId,
    password : password
  };

  res.redirect('/main')
});

router.get('/main', function(req, res) {
  res.render('main');
})

module.exports = router;
