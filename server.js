// Initial setup

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')

// Config
require('dotenv').config({path: './config/.env'})

// Passport
require('./config/passport')(passport)

// More setup

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

console.log(process.env.DB_STRING)

// Sessions
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      maxAge: 24 * 60 * 60 *1000,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)


connectDB().then(() => {
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})
})  