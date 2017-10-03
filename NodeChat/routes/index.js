var util = require('../middleware/utilities');
var config = require('../config');

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.logOut = logOut;

function index(req, res) {
  res.cookie('IndexCookie', 'Set from index');
  res.render('index', {title: 'Index'});
}
function login(req, res) {
  res.render('login', {title: 'Login', message: req.flash('error'), token: res.locals.token});
}
function loginProcess(req, res) {
  var isAuth = util.auth(req.body.username, req.body.password, req.session);
  if (isAuth) {
    res.redirect('/chat');
  } else {
    req.flash('error', 'Wrong Username or Password');
    res.redirect(config.routes.login);
  }
}
function chat(req, res) {
  res.send('Chat');
}

function logOut(req, res) {
  util.logOut(req.session);
  res.redirect('/');
}
