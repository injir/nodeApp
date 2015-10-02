
var Thread = require('../models/Article.js');
var multiparty = require('multiparty');
var fs = require('fs');

exports.post = function(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
}

exports.list = function(req, res) {
  Thread.find(function(err, threads) {
  		
    	res.render('article/view', { title:'Express',model:threads});
  });
}
  exports.create = function(req, res) {
  	if(req.method == 'POST'){
  	 var form = new multiparty.Form();
      form.parse(req, function(err,fields,files){ 
        console.log(files);
        
      });
  	}
  	else{
  		 res.render('article/create', { title:'Create Article'});
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
   		res.redirect('/articles');
   	});
    
   }
   exports.dir = function(req,res){
    fs.readdir('./public/articles', function(err,files){
      var path = './public/articles';
      if(err) throw err;
     console.log(files);
      res.render('article/dir',{ model:files, path: path, undo: path});
    });
   }
exports.createDir = function(req,res){
    var path = req.body.path;
    var name = req.body.name;
    fs.mkdir(path+'/'+name, function(err){
      if(err) throw err;
    });
    fs.readdir(req.body.path, function(err,files){
      var path = req.body.path;

      if(err) throw err;
       res.render('article/dir',{ model:files, path: path, undo: req.body.undo});
     });

   }
exports.dirList= function(req,res){
  if ( /^\.\/public\/articles\/?[\w,\/,(А-Я)(а-я),\., ]*/.test(req.body.path) ) {

    fs.readdir(req.body.path, function(err,files){
      var path = req.body.path;

      if(err) throw err;
       res.render('article/dir',{ model:files, path: path, undo: req.body.undo});
     });
   }   
   else{
    res.send('не-а');
   }
 }
 exports.deleteDir= function(req,res){
   var path = req.body.path;

   if(fs.lstatSync(path).isDirectory()){
      
        fs.rmdir(path, function(err){

        if(err) console.log(err);
      });
      }
     else{
      fs.unlink(path, function(err){

        if(err) console.log(err);
      });
     } 
       
    res.send('ok'); 
  
 }
 
