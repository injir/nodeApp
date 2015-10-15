module.exports = function(app){
//--------------------- CONTROLLERS-----------------------------------	
var routes = require('../routes/index');
var create = require('../routes/create');
var api = require('../controllers/portfolioController');
var model = require('../controllers/modelController');
var photo = require('../controllers/photoController');
var feedback = require('../controllers/feedbackController');
var user = require('../controllers/userController');
var admin = require('../controllers/adminController');
//--------------------------------------------------------

//----------------- DISABLE JAVA SCRIPT---------------------------
app.use('/nojs', function(req,res){
	res.send('У вас отключен Java Script');
});
//-----------------------------------------------------------------
//---------------------------DEFAULT-------------------------------
app.use('/', routes);
//-----------------------------------------------------------------

//---------------------------PORTFOLIO-------------------------------

app.use('/portfolio/scroll',api.scroll);
app.use('/portfolio',api.list);

//-------------------------------------------------------------------

//-----------------------------------3D------------------------

//app.use('/models/create', model.create);

app.use('/models/:id?', function(req,res,next){

	var exp = /\d*/,
	id = req.params.id;

	if(id){
	var result = id.match(exp);
	console.log(req.params.id);
	if(result[0]!==''){
		model.item(req,res);
	}
	else{
		next();
	}
	}
	next();
});
app.use('/models', model.list);



/*
app.get('/models/:id', function (req, res, next) {
  // if user id is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // else pass the control to the next middleware in this stack
  else next(); // 
});
app.use('/models', function (req, res, next){
	model.item(req,res);
	return next();
});
app.use('/models/create', model.create);
*/
//-----------------------------------------------------------------

//-----------------------------PHOTO------------------------------------
app.use('/photo/scroll?',photo.scroll);
//app.use('/photo/create',photo.create);
app.use('/show/:id',model.show); 
//app.use('/photo/delete/:id?',photo.delete);
//app.use('/photo/update/:id?',photo.update);
app.use('/photo?',photo.list);
app.use('/photo/:id?',photo.show);
//-----------------------------------------------------------------
//-----------------------------FEADBACK------------------------------------
app.post('/feedback',feedback.send);
app.get('/feedback',feedback.view);
//-----------------------------------------------------------------

//-----------------------------ADMIN-PANEl------------------------------------
//---------------------Portfolio--------//
app.use('/admin/portfolio/delete/:id?',function(req,res){
	if(req.session.user){
		api.delete(req,res);
		
	}
	else{
		 user.login(req,res);
	}
});

app.use('/admin/portfolio/update/:id?',function(req,res){
	if(req.session.user){
		api.update(req,res);
		
	}
	else{
		 user.login(req,res);
	}
});

app.use('/admin/portfolio/create',function(req,res){
	if(req.session.user){
		api.create(req,res);
		
	}
	else{
		 user.login(req,res);
	}
});

app.use('/admin/portfolio',function(req,res){
	if(req.session.user){
		api.adminList(req,res);
		
	}
	else{
		 user.login(req,res);
	}
});
//---------------------Photo--------//
app.use('/admin/photo/delete/:id?',function(req,res){
	if(req.session.user){
		photo.delete(req,res);
		
	}
	else{
		 user.login(req,res);
	}
});
app.use('/admin/photo/create',function(req,res){
	if(req.session.user){
		photo.create(req,res);
		
	}
	else{
		 user.login(req,res);
	}
});

app.use('/admin/photo',function(req,res){
	if(req.session.user){
		photo.adminList(req,res);
		
	}
	else{
		 user.login(req,res);
	}
});
//--------------------Models-----//
app.use('/admin/models/update/:id?',function(req,res){
	if(req.session.user){
		model.update(req,res);		
	}
	else{
		 user.login(req,res);
	}
});
app.use('/admin/models/delete/:id?',function(req,res){
	if(req.session.user){
		model.delete(req,res);		
	}
	else{
		 user.login(req,res);
	}
});
app.use('/admin/models/create',function(req,res){
	if(req.session.user){
		model.create(req,res);		
	}
	else{
		 user.login(req,res);
	}
});
//--
app.use('/admin/models',function(req,res){
	if(req.session.user){
		model.adminList(req,res);		
	}
	else{
		 user.login(req,res);
	}
});

//-----------------------------//

app.use('/admin',function(req,res){
	if(req.session.user){
		admin.panel(req,res);
		
	}
	else{
		 user.login(req,res);
	}
});
app.use('/logout',function(req,res){
	if(req.session.user){
		req.session.destroy(function(err) {
			if(err)console.log(err);
			res.redirect('/');
		});
		
	}
	else{
		res.redirect('/login');
	}
});

}