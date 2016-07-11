var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Employee.js' });
});

router.get('/object/:id', function(req, res, next) {
  res.render('index', { title: 'Employee.js' });
});

module.exports = router;
