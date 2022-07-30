let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let compress = require('compression');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let passport = require('passport');
let cors = require('cors');
let errorHandler = require('./error-handler');
let app = express();

// Enable cors
app.use(cors());
app.options('*', cors()); // any URL can access --> not recommended in real-world


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let productsRouter = require('../routes/products');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use(passport.initialize());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);


module.exports = app;