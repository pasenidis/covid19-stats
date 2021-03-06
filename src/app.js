const figlet = require('figlet');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const countriesRouter = require('./routes/countries');
const developersRouter = require('./routes/developers');
const geolocateRouter = require('./routes/geolocate');
const infoRouter = require('./routes/info');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/countries', countriesRouter);
app.use('/geolocate', geolocateRouter);
app.use('/developers', developersRouter);
app.use('/info', infoRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


figlet('Covid-19.Tracker', (err, data) => {
  if (err) {
    console.log('Figlet error:');
    console.dir(err);
    return;
  }
  console.log(data);
  console.log('https://covid-19-system.herokuapp.com');
  console.log('https://github.com/pasenidis/covid19-stats');
  console.log('=> Edward & Lean');
});

module.exports = app;
