
var Thread = require('../models/Portfolio.js');


exports.post = function(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
}

exports.list = function(req, res) {
  Thread.find(function(err, threads) {
  		
    	res.render('portfolio/view', { title:'Express',model:threads});
  });
}

