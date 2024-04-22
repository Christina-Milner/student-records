const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new LocalStrategy(
    async function(username, password, done) {
        let user = await User.findOne({ userName: username })
        if (!user) { return done(null, false, { msg: 'Invalid user name or password.'})}
        user.comparePassword(password, (err, isMatch) => {
          if (err) { return done(err)}
          if (isMatch)  {
            return done(null, user)
          }
          return done(null, false, { msg: 'Invalid user name or password.' })
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
  })

passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id).exec() 
      return done(null, user.id)
    }
    catch (err) {
      return done(err, null)
    }
})
}