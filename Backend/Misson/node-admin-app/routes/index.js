var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '관리자 페이지' });
});

router.get('/login', async (req, res) => {
  res.render('login.ejs', {layout:false});
});

router.post('/login', async (req, res) => {
  const userId = req.body.userid;
  const password = req.body.password;

  const userInfo = {
    userId : userId,
    password : password
  };

  res.redirect('/main')
});

router.get('/main', async (req, res) => {
  res.render('main.ejs',  {layout:false} );
})

module.exports = router;
