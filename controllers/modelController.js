
var Thread = require('../models/3dmodel.js');
var multiparty = require('multiparty');
var Jimp = require("jimp");
var fs = require('fs');

var uploadHelper = require('../extention/uploadHelper');

exports.post = function(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
}

exports.list = function(req, res) {
  Thread.find(function(err, threads) {
  		
    	res.render('models/view', { title:'Express',model:threads});
  });
}
 exports.show = function(req, res) {
      
      var id = req.params.id;
      Thread.findOne({_id:id},function(err, threads) {
      if(err){ console.log(err)}
      res.render('models/show', { title:'3d',model:threads});
    });
     
  }
/*
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

  } */

   exports.delete= function(req, res) {
       	var id = req.params.id;
       	console.log(id);
        var path = './public/3d/'+id
        fs.readdir(path+'/image', function(err,files){
           if(files){ 
          for(var i=0; i<files.length; i++){
            fs.unlink(path+'/image/'+files[i], function(err){
              if(err) console.log(err);
            });
             
          }
          fs.unlink(path+'/files/', function(err){
              if(err) console.log(err);
            });
        }
        });
        fs.readdir(path+'/files', function(err,files){
          if(files){
          for(var i=0; i<files.length; i++){
            fs.unlink(path+'/files/'+files[i], function(err){
              if(err) console.log(err);

            });
             
          }

          fs.unlink(path+'/image/', function(err){
              if(err) console.log(err);
            });
        }
        });
         
          
           fs.unlink(path, function(err){
              if(err) console.log(err);
            });

       	var item = Thread.findOne({_id:id});
       	item.remove(function(err){
       		if(err){
       			console.log(err);
       		}
       		res.redirect('/admin/models');
       	});
    
   }

     exports.update= function(req, res) {
 
   var id = req.params.id;
    if(req.method == 'POST'){
    var form = new multiparty.Form();
    form.parse(req, function(err,fields,files){ 
    
  Thread.findOne({_id:id},function(err,result){
    result.update({title: fields.title, author: fields.author, body:fields.body, img:files.image[0].originalFilename},function(err){

        fs.mkdir('./public/3d/'+id,function(err){
          if(err) console.log(err);
           fs.mkdir('./public/3d/'+id+'/image',function(err){
            if(err) console.log(err);
            });
            fs.mkdir('./public/3d/'+id+'/files',function(err){
            if(err) console.log(err);
           });
        });
      
      for(var i = 0; i<files.image.length; i++){
         var upload = new uploadHelper(files.image[i].path,files.image[i].originalFilename,'./public/3d/'+id);
         upload.save();
        
       }
       for(var i = 0; i<files.fileToUpload.length; i++){
         var upload = new uploadHelper(files.fileToUpload[i].path,files.fileToUpload[i].originalFilename,'./public/3d/'+id);
         upload.save();
        
       }
    });
    });   
    
    });

     res.redirect('/admin/models/');
  }
  else{
   Thread.findOne({_id:id},function(err, threads) {
      if(err){
        throw err;
      }
      res.render('admin/models/form', { title:'3d',model:threads});
    });
     
    }
   }

  exports.item= function(req, res) {
      var id = req.params.id;
      console.log(req.params);
       Thread.findOne({_id:id},function(err, threads) {
      if(err){
        throw err;
        }
        res.render('models/show', { title:'Express',model:threads});
        });
    }

exports.create = function(req, res) {
  var id;
  var fileArray = [];
  if(req.method == 'POST'){
    var form = new multiparty.Form();
    form.parse(req, function(err,fields,files){ 
      new Thread({title: fields.title, author: fields.author, body:fields.body, img:files.image[0].originalFilename}).save(function(err,room){
      id = room.id;
      fs.mkdir('./public/3d/'+id,function(err){
          if(err) console.log(err);
           fs.mkdir('./public/3d/'+id+'/image',function(err){
            if(err) console.log(err);
            });
            fs.mkdir('./public/3d/'+id+'/files',function(err){
            if(err) console.log(err);
           });
         });
      
      for(var i = 0; i<files.image.length; i++){
         var upload = new uploadHelper(files.image[i].path,files.image[i].originalFilename,'./public/3d/'+id);
         upload.save();
        
       }
       for(var i = 0; i<files.fileToUpload.length; i++){
         var upload = new uploadHelper(files.fileToUpload[i].path,files.fileToUpload[i].originalFilename,'./public/3d/'+id);
         upload.save();
        
       }
      
    });   
    
    });
     res.redirect('/admin/models/');
  }
  else{
    res.render('models/create', { title:'Create Article'});
  }

}

exports.adminList = function(req, res) {
   var q = Thread.find().limit(10);
  q.exec(function(err,threads){
      res.render('admin/models/view', { title:'Photo',model:threads});
    });
}