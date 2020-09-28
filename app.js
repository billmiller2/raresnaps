var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');

var apiCommentsRouter = require('./routes/api/comments');
var apiPhotosRouter = require('./routes/api/photos');
var apiTagsRouter = require('./routes/api/tags');
var apiUsersRouter = require('./routes/api/users');

var app = express();
var sessionStore = new session.MemoryStore

var mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1:27017/raresnaps-dev'
mongoose.connect(mongoDB, { useNewUrlParser: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next()
})

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/stylesheets', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/public/stylesheets', express.static(__dirname + '/node_modules/ladda/dist'));
app.use('/public/js', express.static(__dirname + '/node_modules/react'));
app.use('/public/js', express.static(__dirname + '/node_modules/jquery/dist'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);
app.use('/api/comments', apiCommentsRouter);
app.use('/api/photos', apiPhotosRouter);
app.use('/api/tags', apiTagsRouter);
app.use('/api/users', apiUsersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
