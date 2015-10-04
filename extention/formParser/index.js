var multiparty = require('multiparty');
var fs = require('fs');
var Jimp = require("jimp");

function FormParcer(req,thread){
	var form = new multiparty.Form();
      form.parse(req, function(err,fields,files){
           file = files.fileToUpload; 

           if(  file.length > 1){
                    for(var i = 0;   file.length > i; i++){
                      var name = fields.path+'/'+file[i].originalFilename;
                      var path  = file[i].path;
                      resize(name,path);
                        /* name = file[i].originalFilename;
                         data = fs.readFileSync(file[i].path);
                         console.log(data);
                          fs.writeFileSync(fields.path+'/'+name, data);*/
                    }
               }

          });
}
module.exports = FormParcer;