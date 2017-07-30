var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multipart = require('connect-multiparty');
var passport = require('passport');
require('./passport');

var routes = require('./routes');

var app = express();
var isDev = app.get('env') === 'development';

const htmlFile = process.env.NODE_ENV === 'production' ?
    path.resolve(__dirname, '..', 'assets', 'index.html') :
    path.resolve(__dirname, '..', 'content', 'index.html');
const assetsFolder = path.resolve(__dirname, '..', 'assets');
const staticFolder = path.resolve(__dirname, '..', 'static');


// view engine setup
app.use(logger('dev'));
app.use(multipart({
   uploadDir: path.join(__dirname, 'tmp')
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: 'hello world'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static(assetsFolder));
app.use('/static', express.static(staticFolder));

routes(app);

app.get('/*', (req, res) => res.sendFile(htmlFile));

module.exports = app;
