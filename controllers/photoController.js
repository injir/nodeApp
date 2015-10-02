
var Thread = require('../models/Photo.js');
var imageHelper = require('../extention/helpers/imageHelper');
var multiparty = require('multiparty');
var fs = require('fs');
var im = require('imagemagick'); // Для изменения размера изображения требуется установленный imagemagick
var iwip= require('lwip');
//------------------------------------------------------
exports.list = function(req, res) {
  Thread.find(function(err, threads) {
  		
    	res.render('photo/view', {title:'Express',model:threads});
  });
}
//------------------------------------------------------

//------------------------------------------------------
  exports.create = function(req, res) {
  	if(req.method == 'POST'){
   
     var format = '.jpg';
      var options,
      change;
     var  modelId;
      var form = new multiparty.Form();
      form.parse(req, function(err,fields,files){ 
     
         new Thread({title: fields.title, author: fields.author}).save(function(err,room){
           modelId = room.id;
        });   
       
        var img = files.fileToUpload[0];
        
        var path = './public/upload/'+img.originalFilename;
        //var thumbPath= './public/upload/small_'+img.originalFilename;
      options = {
        format:'.jpg',
        _src:img.path,
        uploadPath:'./public/upload/',
        _id: modelId,
      };
      change={};
      iwip.open(options._src, function(err, image){
         var k=2;
        if(image.width()>1000 && image.width()<2000){
          k = 3;
        }
         else if(image.width()>=2000 && image.width()<4000){
          k = 5;
        }
        else if(image.width()>=4000 && image.width()<5000){
          k = 8;
        }
         else if(image.width()>5000){
          k = 10;
        }
        

        change.width = image.width()/k;
        console.log(k);
          change.height = image.height()/k;
              image.batch()
                .resize( change.width,change.height)            // Gaussian blur with SD=5
                .writeFile( options.uploadPath+'small_'+modelId+ options.format, function(err){
                 
                });
              

 });
       iwip.open(options._src, function(err, image){
              image.batch()                       // Gaussian blur with SD=5
                .writeFile( options.uploadPath+modelId+ options.format, function(err){
                 res.redirect('/photo');
                });
              

 });
  	 });
  }
  	else{
  		 res.render('photo/create', { title:'Create Article'});
  	}

  }
//------------------------------------------------------
 exports.update= function(req, res) {
     var id = req.params.id;
    
    if(req.method == 'POST'){
   
     var format = '.jpg';
      var options,
      change;
     var  modelId;
      var form = new multiparty.Form();
      form.parse(req, function(err,fields,files){ 
      Thread.findOne({ _id: id }, function (err, doc){
      doc.title = fields.title;
      doc.author = fields.author;
      
      doc.save();
      });
       
      if(files.fileToUpload[0].originalFilename!==''){
        modelId = id;
        var img = files.fileToUpload[0];
        
        var path = './public/upload/'+img.originalFilename;
        //var thumbPath= './public/upload/small_'+img.originalFilename;
      options = {
        format:'.jpg',
        _src:img.path,
        uploadPath:'./public/upload/',
        _id: modelId,
      };
      change={};
      iwip.open(options._src, function(err, image){
         var k=2;
        if(image.width()>1000 && image.width()<2000){
          k = 3;
        }
         else if(image.width()>2000 && image.width()<4000){
          k = 5;
        }
         else if(image.width()>5000){
          k = 10;
        }
          change.width = image.width()/k;
          change.height = image.height()/k;
          
              image.batch()
                .resize( change.width,change.height)            // Gaussian blur with SD=5
                .writeFile( options.uploadPath+'small_'+modelId+ options.format, function(err){
                 
                });
              

 });
       iwip.open(options._src, function(err, image){
              image.batch()                       // Gaussian blur with SD=5
                .writeFile( options.uploadPath+modelId+ options.format, function(err){
                 
                });
              

 });
     }
     });

  }
  else{
   Thread.findOne({ _id: id }, function (err, doc){
    res.render('photo/update',{title:'Редактирование',model:doc});
      });
  
  }
    
}


//------------------------------------------------------
   exports.delete= function(req, res) {
   	var id = req.params.id;
   
   	var item = Thread.findOne({_id:id});

   	item.remove(function(err){
   		if(err){
   			console.log('что то не так');
   		   }
       fs.unlink('public/upload/small_'+id+'.jpg', function(e){
        console.log(e);
       });
       fs.unlink('public/upload/'+id+'.jpg', function(e){
        console.log(e);
       });    
   		 res.redirect('/photo');
   	  });
    
    }


    exports.show= function(req, res) {
  
    var id = req.params.id;
   Thread.findOne({_id:id},function(err, threads) {
      if(err){
        throw err;
      }
      res.render('photo/show', { title:'Express',model:threads});
  });
     
    
   }


function saveImage(options,change,id){
  if(options && change){
 iwip.open(options._src, function(err, image){
              image.batch()
                .resize( change.width,change.height)            // Gaussian blur with SD=5
                .writeFile( options.uploadPath+'small_'+ id+ options.format, function(err){
                 
                });
              

 });

  }
  else{
     iwip.open(options._src, function(err, image){
              image.batch()                       // Gaussian blur with SD=5
                .writeFile( options.uploadPath+id+ options.format, function(err){
                 
                });
              

 });
  }
}      