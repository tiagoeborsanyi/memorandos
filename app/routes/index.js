var passport = require('passport');

module.exports = function(app) {

	//home page (login links)
	app.get('/', function(req, res){

		res.render('index');
	});

	/*app.post('/login', passport.authenticate('local', {failureRedirect: '/'}),
		function(req, res){
			console.log('nao esta renderizando');
			res.redirect('/home');
		});*/

	app.post('/login', passport.authenticate('local', {
		successRedirect : '/home',
		failureRedirect : '/'
	}));

	//fazer logout e encerrar todas a sessions
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/home', logado, function(req, res){
		var login = '';
		var id = req.session.passport.user;
		if(req.user){
			login = req.user.login;
		}
		console.log(req.session.passport.user);
		res.render('home.ejs', {
			"usuario" : login,
			"id" : id
		});
	});


};

function logado(req, res, next){

	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}
