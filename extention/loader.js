var multiparty = require('multiparty');
var fs = require('fs');
/*
function Loader(req,model,res){
	this.req = req;
	this.model = model;
	
 this.formParse=function(){
 	var form = new multiparty.Form();
     	form.parse(this.req, function(err,fields,files){ 
  
     		if(err) console.log(err);
               this.fields = fields;
     		this.file = files;
     		if(files.length > 1){
     			for(var i = 0; files.length > i; i++){
     				fs.readFile(files[i], function(err, data){
     					//this.data.push(data);
     				});
     			}
     		}

      	});
     } 

}

module.exports = Loader;
*/
module.exports = function (req){
          var a= [];
          var name,data;
      var form = new multiparty.Form();
      form.parse(req, function(err,fields,files){
           file = files.fileToUpload; 

           if(  file.length > 1){
                    for(var i = 0;   file.length > i; i++){
                         name = file[i].originalFilename;
                         data = fs.readFileSync(file[i].path);
                         console.log(data);
                          fs.writeFileSync(fields.path+'/'+name, data);
                    }
               }

          });
     
}      

