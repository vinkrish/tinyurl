var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var passport = require('passport')
var session = require('express-session')
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

require('dotenv').config()

var app = express()

var port = process.env.PORT || 3000

require('./config/passport')(passport)

// set the view engine to ejs
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(session({ resave: false, saveUninitialized: true, secret: 'secretsession' }))
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

app.get('/', function (req, res) {
    res.render('pages/index.ejs')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const apiRouter = require('./routes/apiRoutes')()

app.use('/api', apiRouter)

require('./routes/route.js')(app, passport)

app.listen(port, function () {
    console.log('app running on port: ', port)
})

module.exports = app
