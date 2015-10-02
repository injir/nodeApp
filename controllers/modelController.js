
var Thread = require('../models/3dmodel.js');


exports.post = function(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
}

exports.list = function(req, res) {
  Thread.find(function(err, threads) {
  		
    	res.render('models/view', { title:'Express',model:threads});
  });
}
  exports.create = function(req, res) {
  	if(req.method == 'POST'){
  		var title = req.body.title;
		var author = req.body.author;
		var body = req.body.body;
  		var article = new Thread({title:title,author:author,body:body});
  	article.save(function (err){
  	if(err){
  		console.log('Ошибка записи');
  	}
  	 res.redirect('/3dmodels');
  	});
  	}
  	else{
  		 res.render('models/create', { title:'Create Article'});
  	}

  }

   exports.deleteArticle= function(req, res) {
   	var id = req.params.id;
   	console.log(id);
   	var item = Thread.findOne({_id:id});
   	item.remove(function(err){
   		if(err){
   			console.log('что то не так');
   		}
   		res.redirect('/3dmodels');
   	});
    
   }
     exports.show= function(req, res) {
      //560144bd40a217481222b39e//
   var id = req.params.id;
    console.log(req.params);
   Thread.findOne({_id:id},function(err, threads) {
      if(err){
        throw err;
      }
      res.render('models/show', { title:'Express',model:threads});
  });
     
    
   }



