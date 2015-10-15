
var Thread = require('../models/Photo.js');
var multiparty = require('multiparty');
var fs = require('fs');
var uploadHelper = require('../extention/uploadHelper');
//------------------------------------------------------
exports.list = function(req, res) {
   var q = Thread.find().limit(2);
  q.exec(function(err,threads){
      res.render('photo/view', { title:'Express',model:threads});
    });
}
//------------------------------------------------------

//------------------------------------------------------
 exports.create = function(req, res) {
      var id;
    var fileArray = [];
  if(req.method == 'POST'){
    var form = new multiparty.Form();
    form.parse(req, function(err,fields,files){ 
      new Thread({title: fields.title, author: fields.author, img:files.image[0].originalFilename}).save(function(err,room){
       id = room.id;
       fs.mkdir('./public/upload/photo/'+id,function(err){
            if(err) console.log(err);
            fs.mkdir('./public/upload/photo/'+id+'/image',function(err){
            if(err) console.log(err);
          }); 
          }); 
        console.log(files.image[0].path);
        var upload = new uploadHelper(files.image[0].path,files.image[0].originalFilename,'./public/upload/photo/'+id);
        upload.resize();
        res.redirect('/admin/photo');
      });
     });  

    }
  	else{
  		 res.render('admin/photo/create', { title:'Create Article'});
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
       
       var img = new Jimp(files.fileToUpload[0].path, function (err, image) {
         var k=2;
          var width = image.bitmap.width;
         var height = image.bitmap.height;
         console.log(width);
        if(width>1000 && width<2000){
          k = 3;
        }
         else if(width>=2000 && width<4000){
          k = 5;
        }
        else if(width>=4000 && width<5000){
          k = 8;
        }
         else if(width>5000){
          k = 10;
        }
         image.write('./public/upload/photo/original/'+id+'.jpg');
        image.resize((width/k), (height/k)).write('./public/upload/photo/small/'+id+'.jpg');
       
      });
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
        console.log(id);
        var path = './public/upload/photo'+id
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
          res.redirect('/admin/photo');
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

exports.scroll= function(req,res){
  var page = req.body.page;
  var range = 2;
  var from = page*range;
  var q = Thread.find().skip(from).limit(range);
  q.exec(function(err, threads){
    res.render('photo/item', { title:'Express',model:threads});
    
  });

  
}
//---------------------------------------------------Admin-------- //
exports.adminList = function(req, res) {
   var q = Thread.find().limit(10);
  q.exec(function(err,threads){
      res.render('admin/photo/view', { title:'Photo',model:threads});
    });
}