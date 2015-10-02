var express = require('express');
var router = express.Router();
var portfolio = require('../models/Portfolio');
router.post('/', function(req, res, next) {
	var title = req.body.title;
	var author = req.body.author;
	var body = req.body.body;
  var folio = new portfolio({title:title,author:author,body:body});
  folio.save(function (err){
  	if(err){
  		console.log('Ошибка записи');
  	}
  	 res.redirect('/portfolio');
  })


});
router.get('/', function(req, res, next) {
  res.render('portfolio/create', { title:'Express'});
});

module.exports = router;
