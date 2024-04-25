const Student = require('../models/Student')
const User = require('../models/User')

module.exports = {
    errorMes: (req, res) => {
        res.render('error.ejs')
    },
    getIndex: async (req, res) => {
        if (req.isAuthenticated()) {
            const data = await Student.find({}).lean()
            res.render('index.ejs', { isAuthenticated: req.isAuthenticated(), info: data})

        } else {
            res.render('index.ejs', { isAuthenticated: req.isAuthenticated()})
        }      
    },
}