var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var passport = require('passport')
var session = require('express-session')
var mysql = require('mysql')

require('dotenv').config()

var app = express()

var port = process.env.PORT || 3000

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT
  });

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

require('./config/passport')(passport)

// set the view engine to ejs
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(session({ resave: false, saveUninitialized: true, secret: 'secretsession' })) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

app.get('/', function (req, res) {
    res.render('pages/index.ejs')
})

require('./routes/route.js')(app, passport)

const apiRouter = require('./routes/apiRoutes')()

app.use('/api', apiRouter)

app.listen(port, function () {
    console.log('app running on port: ', port)
})

module.exports = app
