const express = require('express'),
    morgan = require('morgan'),
    path = require('path'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    errorMiddleware = require('./middleware/error'),
    saveFile = require('./routers/savefile');


const app = express();
// session

//app.use(session({ secret: '142e6ecf42884f03', resave: false, saveUninitialized: true }));

// set morgan for logging
//app.use(morgan('tiny'));

// set folder for static file
//app.use(express.static(path.join(__dirname, '/static')));

// middleware for form destructure

//app.use(express.urlencoded({ extended: true }));

// cookies parsing
//app.use(cookieParser('142e6ecf42884f03'));


app.use('/uploadFile', saveFile);
app.use(errorMiddleware);


app.listen(8000, () => { console.log('Backend server listening on http://localhost:8000/ ...'); });