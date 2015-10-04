module.exports = function(app){
var routes = require('../routes/index');
var users = require('../routes/users');
var create = require('../routes/create');
var article = require('../controllers/articleController');	
var api = require('../controllers/portfolioController');
var model = require('../controllers/modelController');
var photo = require('../controllers/photoController');
var feedback = require('../controllers/feedbackController');
app.use('/nojs', function(req,res){
	res.send('У вас отключен Java Script');
});
app.use('/', routes);
app.use('/users', users);
app.use('/portfolio',api.list);

app.use('/articles/dir?',article.dir);

app.use('/articles/dir/list?',article.dirList)
app.use('/articles/dir/create?',article.createDir)
//app.use('/articles/dir/:dir?',article.showDir)
app.use('/articles/load?',article.load);

app.use('/articles/delete',article.deleteDir);
app.use('/articles/create',article.create);


app.use('/articles?',article.list);

app.use('/delete/:id?',article.deleteArticle);
app.use('/models',model.list);
//app.use('/show/:id?',model.show);
//app.use('/:id',model.show);
app.use('/3d', function(req,res){
	res.render('models/babylon');
});

app.use('/photo/create',photo.create);
// will match paths starting with /abcd and /abd
app.use('/show/:id',model.show);
app.use('/photo/delete/:id?',photo.delete);
app.use('/photo/update/:id?',photo.update);
app.use('/photo?',photo.list);


app.use('/photo/create',photo.create);

app.use('/photo/:id?',photo.show);

app.post('/feedback',feedback.send);
app.get('/feedback',feedback.view);


}