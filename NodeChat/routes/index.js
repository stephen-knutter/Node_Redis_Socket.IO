var util = require('../middleware/utilities');

module.exports.index = index;
module.exports.login = login;
module.exports.logOut = logOut;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;

function index(req, res) {
  res.cookie('IndexCookie', 'This was set from Index');
  res.render('index',{title: 'Redis & Socket.io', signedCookie: JSON.stringify(req.signedCookies)});
}

function login(req, res) {
  res.render('login', {title: 'Login', message: req.flash('error')});
}

function loginProcess(req, res) {
  var isAuth = util.auth(req.body.username, req.body.password, req.session);
  if (isAuth) {
    res.redirect('/chat');
  } else {
    req.flash('error', 'Wrong Username and Password');
    res.redirect(config.routes.login);
  }
}

function logOut(req, res) {
  util.logOut(req.session);
  res.redirect('/');
}

function chat(req, res) {
  res.render('chat', {title: 'Chat'});
}
