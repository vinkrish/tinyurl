module.exports = function (app, passport) {
  app.get('/login', (req, res) => {
    res.render('pages/login.ejs')
  })
  
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home', // redirect to the secure home section
    failureRedirect: '/login' // redirect back to the signup page if there is an error
  }))

  app.get('/home', isLoggedIn, (req, res) => {
    res.render('pages/home', {
      user: req.user
    })
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
  })

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  // the callback after google has authenticated the user
  app.get('/oauth2callback',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )

  app.get('*', (req, res) => {
    const originalUrlController = require('../controller/originalUrlController')()
    originalUrlController.getOriginalUrl(req.path)
      .then(url => {
        if (url) {
          res.redirect(url)
        } else {
          res.render('pages/404')
        }
      })
      .catch(error => {
        console.log(error)
      })
  })
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) { return next() }

  res.redirect('/login')
}
