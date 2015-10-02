var express = require('express');
var router = express.Router();
var model = require('../controllers/portfolioController');

router.get('/', function(req, res, next) {
      var list = model.list(req,res);
  		res.render('portfolio/view', { title:'Express',model:list});
		});
router.post('/', function(req, res, next) {
      res.render('portfolio/view', { title:'Express',model:list});
    });


module.exports = router;
