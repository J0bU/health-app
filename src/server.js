'use strict'

//---------------Initializations-----------------

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const MethodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//  ----------------------------------------
const app = express();
require('./config/passport');

//----------------Settings-----------------
app.set('port', process.env.PORT || 4000);
app.set('views', path.resolve(__dirname, './views/'));
app.engine('.hbs', exphbs({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), './layouts/' ),
    partialsDir: path.join(app.get('views'), './partials/'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//---------------Middlewares -----------------
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(MethodOverride('_method'));
app.use(session({
    secret: 'secretWord',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




//---------------- Global variables----------------- 
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//------------------Routes -----------------
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

//----------------Static files-----------------
// app.set(express.static(path.resolve(__dirname, 'public ')));
app.use(express.static(path.resolve(__dirname, './public/')));
// console.log(path.join(__dirname, '/public'));

module.exports = app;


