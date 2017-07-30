const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const multipart = require('connect-multiparty');
const passport = require('passport');
require('./passport');

const routes = require('./routes');

const app = express();
const isDev = app.get('env') === 'development';

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
