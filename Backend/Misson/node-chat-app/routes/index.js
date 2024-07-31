var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
  
*/ 
router.get('/chat', async(req, res) => {
  res.render('chat.ejs');
});

router.get('/groupchat', async(req,res) => {
  res.render('groupchat.ejs');
});

module.exports = router;
