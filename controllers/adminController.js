var multiparty = require('multiparty');

exports.panel = function(req, res) {
	  res.render('admin/index', { title: 'Admin-panel' });
}
/*---------------------------PORTFOLIO----------------------------------------*/
// Portfolio list
exports.portfolio = function(req, res) {
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
    
  }
  else{
    res.render('models/create', { title:'Create Article'});
  }

} 