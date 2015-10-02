// Для изменения размера изображения требуется установленный Python >2.0
var fs = require('fs');
var im = require('imagemagick'); // Для изменения размера изображения требуется установленный imagemagick
var iwip= require('lwip');
function ImageHelper(options, changeOptions){
	this.options = options;
	 this.format = options.format;
	 this.image = options._src;  
	 this.uploadPath = options.uploadPath; // Путь для сохранения
	 this.id = options._id; // _id  Записи в mongo, для генерации имени 
	 this.newWidth = changeOptions.width; // Ширина измененной картинки
	 this.newHeight = changeOptions.height; // Высота измененной картинки
	 this.newImage;
//-----------------------МЕТОДЫ--------------------
 	this.resizeImage = function(){
 		iwip.open(this.image, function(err, image){

  // check err...
  // define a batch of manipulations and save to disk as JPEG:
  image.batch()
    .scale(0.75)          // scale to 75%
    .rotate(45, 'white')  // rotate 45degs clockwise (white fill)
    .crop(200, 200)       // crop a 200X200 square from center
    .blur(5)              // Gaussian blur with SD=5
    .writeFile(this.uploadPath+'123'+this.format, function(err){
      // check err...
      // done.
    });

});
 	}

 	this.saveImage= function(){
 		iwip.open(this.image, function(error, image){
 	   	if(error) throw error; // Проверка на ошибки
		image.batch()
		.writeFile(this.uploadPath+this.id+this.format, function(err){
 			if(err) throw 'Ошибка сохранения оригинала: '+err;
 		});        
		});
 		iwip.open(this.image, function(error, image){
 	   	if(error) throw error; // Проверка на ошибки
 	   	image.batch()
 	   	 .resize(this.width,this.height)
 		 .writeFile(this.uploadPath+'small_'+this.id+this.format, function(err){
     		if(err) throw 'Ошибка сохранения измененной копии: '+err;
   		});
 		});
 	}
//-------------------------------------------------
}
module.exports = ImageHelper;