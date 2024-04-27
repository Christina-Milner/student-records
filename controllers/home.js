const Student = require('../models/Student')
const User = require('../models/User')

module.exports = {
    checkIfAdmin: async (id) => {
        const findMe = await User.find({_id: id}).exec()
        const user = findMe[0]
        return user && user.isAdmin
    },
    errorMes: (req, res) => {
        res.render('error.ejs')
    },
    getIndex: async (req, res) => {
        if (req.isAuthenticated()) {
            const data = await Student.find({}).lean()
            const admin = await module.exports.checkIfAdmin(req.user)
            res.render('index.ejs', { isAuthenticated: req.isAuthenticated(), info: data, isAdmin: admin})

        } else {
            res.render('index.ejs', { isAuthenticated: req.isAuthenticated()})
        }      
    },
    addUser: async (req, res) => {
        const admin = await module.exports.checkIfAdmin(req.user)
        if (!admin) {
            console.log("Not an admin so nope")
            res.redirect('/')
        }
        try {
            const user = new User({
                username: req.body.username,
                password: req.body.password,
                isAdmin: false
            })
            await user.save()
            res.redirect('/')
        } catch(err) {
            console.log("Figure out better error handling", err)
            res.redirect('/')
        }
    }
}