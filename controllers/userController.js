var Thread = require('../models/User.js');
var multiparty = require('multiparty');

exports.login = function(req, res) {
	if(req.method == 'POST'){
   	var login =	req.body.login;
   	var password = req.body.password;

   	Thread.findOne({login:login},function(err,result){
   		if(err) res.send('Не верный пароль');
   		if(result){
   		if(result.checkPassword(password)){
   				req.session.user = {
                  status: result.role,
               }
              res.redirect('admin');
   			}
   		else{
   				res.send('Не верный пароль');
   			}	
   		}
   		else{
   				res.send('Не верный пароль');
   			}	
   	});
   		
   	}
   	else{
   	res.render('user/login',{ title:'Login form'});
   }
}