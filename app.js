const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');
const pool = require('./db')
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;


const indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const clientRouter = require('./routes/clients');
const adminRouter = require('./routes/admin');
const devRouter = require('./routes/dev');
const authrouter = require('./routes/auth')

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/dev',devRouter);
app.use('/admin', adminRouter);
// app.use('/admin/createproject',adminRouter);
app.use('/auth', authrouter)
// app.use('/users', usersRouter);

// console.log("insert query ")
// pool.query("INSERT INTO `task_managerdb`.`saveme` ( `save_what`, `saved_by`, `save_date`) VALUES(?,?,?)",['test 3',4,'2021-01-01 00:00:00'],  (err, rows)=> {
//     console.log("insert Response" , rows);
//     console.log(err)
// });



// console.log("insert by proc query ")
// pool.query("call save_me(?,?,?)",['test 3',4,'2021-01-01 00:00:00'],  (err, rows)=> {
//     console.log("insert Response" , rows);
//     console.log(err)
// });



// console.log("Select query ")
// pool.query("select * from  `task_managerdb`.`saveme`",  (err, rows)=> {
//     console.log("Select Response" , rows);
//     console.log(err)
// });





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


// // send email things 
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'techthroughwomen@gmail.com',
//     pass: 'TTwomen2023'
//   }
// });

// var mailOptions = {
//   from: 'techthroughwomen@gmail.com',
//   to: 'naomibukusi@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


module.exports = app;
