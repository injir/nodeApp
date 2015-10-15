
var Thread = require('../models/Portfolio.js');
var multiparty = require('multiparty');
var fs = require('fs');
var uploadHelper = require('../extention/uploadHelper');



exports.list = function(req, res) {
  var q = Thread.find().limit(6);
  q.exec(function(err,threads){
  		res.render('portfolio/view', { title:'Express',model:threads});
  	});
  }

	
exports.scroll= function(req,res){
	var page = req.body.page;
	var range = 2;
	var from = page*range;
	var q = Thread.find().skip(from).limit(range);
	q.exec(function(err, threads){
		if(threads == []){
		return false;		
		}
		else{	
		res.render('portfolio/item', {model:threads, session: req.session.user});
		}
	});

	
}


/*---------------------------Admin----------------------------------------*/
function checkDir(id){
	fs.mkdir('./public/upload/portfolio',function(err){
         	if(err) console.log(err);
         		fs.mkdir('./public/upload/portfolio/'+id,function(err){
         		if(err) console.log(err);
         		fs.mkdir('./public/upload/portfolio/'+id+'/image',function(err){
         		if(err) console.log(err);
     			});	
     			});	
     });		


}

// Portfolio list
exports.adminList = function(req, res) {
     var q = Thread.find().limit(6);
      q.exec(function(err,threads){
      res.render('admin/portfolio/view', { title:'Portfolio-Panel',model:threads});
   });
}  
//Create new record
exports.create= function(req,res){
    var id;
  	var fileArray = [];
  if(req.method == 'POST'){
    var form = new multiparty.Form();
    form.parse(req, function(err,fields,files){ 
      new Thread({title: fields.title, author: fields.author, body:fields.body, img:files.image[0].originalFilename}).save(function(err,room){
     	 id = room.id;
     	 fs.mkdir('./public/upload/portfolio/'+id,function(err){
         		if(err) console.log(err);
         		fs.mkdir('./public/upload/portfolio/'+id+'/image',function(err){
         		if(err) console.log(err);
     			});	
     			});	
  			console.log(files.image[0].path);
     	  var upload = new uploadHelper(files.image[0].path,files.image[0].originalFilename,'./public/upload/portfolio/'+id);
     	  upload.resize();
     	  res.redirect('/admin/portfolio');
  		});
     });	

  }
  else{
    res.render('admin/portfolio/form', { title:'Create'});
  }

} 
exports.delete= function(req,res){
	var id = req.params.id	
	Thread.findOne({_id:id}).remove(function(err){
		if(err) console.log
		res.redirect('/admin/portfolio');	

	});
} 
exports.update= function(req,res){
var id = req.params.id	
  if(req.method == 'POST'){
    var form = new multiparty.Form();
    form.parse(req, function(err,fields,files){ 

  Thread.findOne({_id:id},function(err,result){
	 result.update({title: fields.title, author: fields.author, body:fields.body, img:files.image[0].originalFilename},function(err){
	 	if(err)console.log(err);

	 	 var upload = new uploadHelper(files.image[0].path,files.image[0].originalFilename,'./public/upload/portfolio/'+id);
     	  upload.resize();
     	  res.redirect('/admin/portfolio');
	 });
	});
     
    });	

  }
else{	
	Thread.findOne({_id:id},function(err,result){
	 res.render('admin/portfolio/form', { title:'Update', model:result});
	});
}
} 

