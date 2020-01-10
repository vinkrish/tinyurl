var LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require('passport-google-oauth2').Strategy

var configAuth = require('./auth')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    process.nextTick(function () {
      if (email == 'test@tinyurl.com' && password == 'testpassword') {
        return done(null, email)
      } else {
        return done('error logging in')
      }
    })
  }))

  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientId,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackUrl,
    passReqToCallback: true

  },
  function (request, accessToken, refreshToken, profile, done) {
    // make the code asynchronous
    process.nextTick(function () {
      return done(null, profile.id)
    })
  }))
}
