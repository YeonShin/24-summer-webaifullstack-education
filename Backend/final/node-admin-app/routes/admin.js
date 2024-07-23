var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
    res.render('admin/list.ejs');
});

router.get("/create", function(req, res) {
    res.render('admin/create.ejs');
});

router.post('/create', function(req, res) {
    const adminId = req.body.adminId;
    const adminPassword = req.body.adminPassword;

    const adminInfo = {
        adminId: adminId,
        adminPassword: adminPassword
    };

    res.redirect('/admin/list');
})


module.exports = router;