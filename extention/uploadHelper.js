var fs = require('fs');
var mime = require('mime');
var Jimp = require("jimp");
function UploadHelper(file,name,path){

    this.type =mime.lookup(file); 
    this.mimeType = [
    'image/jpeg',
    'image/png',
    'image/gif',
    ];
    this.file = file;
    this.name = name;
    this.path = path;
   this.save = function(){
    var path = this.path;
        if(this.isImage()){
          path = path+'/image/'+this.name;
          
        }
        else{
          path = path+'/files/'+this.name;
        }
       this.uploadFile(path);  
   }
   this.isImage = function(){
    for(val in this.mimeType){
      if(this.mimeType[val] == this.type){
        return true;
      }
      else if (this.type == 'application/octet-stream'){
      this.name = 'model.babylon';
     }
      return false

    }

   }
   this.uploadFile = function(path){
       fs.readFile(this.file, function(err,result){
          if(err) console.log(err);
          
            fs.writeFile(path, result, function(err){
               if(err) console.log(err);

            });
         }); 
   }
   

   this.resize= function(){
    var img = new Jimp(this.file, function (err, image) {
      var k=2;
       var width = image.bitmap.width;
         var height = image.bitmap.height;
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

        image.write(path+'/image/original_'+name);
        image.resize((width/k), (height/k)).write(path+'/image/'+name);
        
      
      });
  }
}
module.exports = UploadHelper;