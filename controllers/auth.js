const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/')  /* May need to adapt this */
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
    if (validator.isEmpty(req.body.username)) validationErrors.push({ msg: 'User name cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { console.log("Error: ", err); return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect('/')    /* May need to change */
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) { return next(err)}
      console.log('User has logged out.')
      req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err) // Session destroy goes inside logout callback or it breaks
        req.user = null
        res.redirect('/')
      })
    })
  }
   