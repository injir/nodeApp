
var Thread = require('../models/Portfolio.js');
var nodemailer = require("nodemailer");

exports.view = function(req, res) {
    res.render('feedback/view',{title:'Обратная связь'});
}

exports.list = function(req, res) {
  Thread.find(function(err, threads) {
  		
    	res.render('portfolio/view', { title:'Express',model:threads});
  });
}
exports.send = function(req, res) {
    var smtpTransport = nodemailer.createTransport("SMTP",{
		service: "Gmail",
		auth: {
		user: "dize.webstudio@gmail.com",
		pass: "dancemacabre"
		}
		});
    var mailOptions={
		from: req.body.to,
		to: 'dize.webstudio@gmail.com',
		subject : req.body.title,
		text : req.body.body,
		
		}
	var mailTest = {
    from: 'jojo', // sender address
    to: 'dize.webstudio@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};	
		console.log(mailOptions);
		smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
		console.log(error);
		res.end("error");
		}else{
		console.log("Message sent: " + response.message);
		res.end("sent");
		}
		});
}
