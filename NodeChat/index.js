var express = require('express');
var app = express();
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers');
var util = require('./middleware/utilities');
var log = require('./middleware/log');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var csrf = require('csurf');
var RedisStore = require('connect-redis')(session);
var config = require('./config');

var partials = require('express-partials');
app.use(partials());
app.set('view options', {defaultLayout: 'layout'});

app.set('view engine', 'ejs');
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser(config.secret));
app.use(session({
          secret: config.secret,
          saveUninitialized: true,
          resave: true,
          store: new RedisStore({url: config.redisUrl})
        }));
app.use(flash());
app.use(util.templateRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(csrf());
app.use(util.csrf);

app.use(util.authenticated);

app.get('/', routes.index);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get(config.routes.logout, routes.logOut);
app.get('/chat', [util.requireAuthentication], routes.chat);
app.get('/error', function(req, res, next) {
  next(new Error('A contrived error'));
});

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(config.port);
console.log("App server running on port 3000");
