module.exports = function (app, passport) {
  app.get('/admin', function (req, res) {
    res.render('pages/admin.ejs')
  })

  app.get('/login', function (req, res) {
    res.render('pages/login.ejs', { message: 'Succesfully logged in' })
  })

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home', // redirect to the secure home section
    failureRedirect: '/login' // redirect back to the signup page if there is an error
  }))

  app.get('/home', isLoggedIn, function (req, res) {
    res.render('pages/home', {
      user: req.user
    })
  })

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/admin')
  })

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  // the callback after google has authenticated the user
  app.get('/oauth2callback',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/admin'
    }))
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) { return next() }

  res.redirect('/admin')
}
