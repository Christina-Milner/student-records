const Student = require('../models/Student')
const User = require('../models/User')

module.exports = {
    errorMes: (req, res) => {
        res.render('error.ejs')
    },
    getIndex: (req, res) => {
        res.render('index.ejs', { isAuthenticated: req.isAuthenticated() })
    },
}