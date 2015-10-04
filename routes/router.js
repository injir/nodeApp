module.exports = function(app){
//--------------------- CONTROLLERS-----------------------------------	
var routes = require('../routes/index');
var create = require('../routes/create');
var article = require('../controllers/articleController');	
var api = require('../controllers/portfolioController');
var model = require('../controllers/modelController');
var photo = require('../controllers/photoController');
var feedback = require('../controllers/feedbackController');
//--------------------------------------------------------

//-----------------FOR DISABLE JAVA SCRIPT---------------------------
app.use('/nojs', function(req,res){
	res.send('У вас отключен Java Script');
});
//-----------------------------------------------------------------
//---------------------------DEFAULT-------------------------------
app.use('/', routes);
//-----------------------------------------------------------------

//---------------------------PORTFOLIO-------------------------------
app.use('/portfolio',api.list);
//-------------------------------------------------------------------

//---------------------------ARTICLES-------------------------------
app.use('/articles/dir/list?',article.dirList)
app.use('/articles/dir/create?',article.createDir)
app.use('/articles/dir?',article.dir);
app.use('/articles/test',article.test)
//app.use('/articles/dir/:dir?',article.showDir)
app.use('/articles/load?',article.load);
app.use('/articles/delete',article.deleteDir);
app.use('/articles/create',article.create);
app.use('/articles?',article.list);
app.use('/delete/:id?',article.deleteArticle); // Нужно поменять !!!!!!!!!!!!
//-----------------------------------------------------------------

//-----------------------------------3D------------------------
app.use('/models',model.list);
//app.use('/show/:id?',model.show);
//app.use('/:id',model.show);
app.use('/3d', function(req,res){
	res.render('models/babylon');
});
//-----------------------------------------------------------------

//-----------------------------PHOTO------------------------------------
app.use('/photo/create',photo.create);
app.use('/show/:id',model.show); //Нужно поменять !!!!!!!!!!!!
app.use('/photo/delete/:id?',photo.delete);
app.use('/photo/update/:id?',photo.update);
app.use('/photo?',photo.list);
app.use('/photo/create',photo.create);
app.use('/photo/:id?',photo.show);
//-----------------------------------------------------------------
//-----------------------------FEADBACK------------------------------------
app.post('/feedback',feedback.send);
app.get('/feedback',feedback.view);
//-----------------------------------------------------------------

}