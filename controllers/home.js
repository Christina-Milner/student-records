const Student = require('../models/Student')
const User = require('../models/User')

const { getId, checkIfAdmin } = require('../helpers/helpers')


module.exports = {
    // Show main page and list of students (includes GET students)

    getIndex: async (req, res) => {
        if (req.isAuthenticated()) {
            const data = await Student.find()
            const admin = await checkIfAdmin(req.user)
            res.render('index.ejs', { isAuthenticated: req.isAuthenticated(), info: data, isAdmin: admin})

        } else {
            res.render('index.ejs', { isAuthenticated: req.isAuthenticated()})
        }      
    },

    // Add a (read-only) user

    addUser: async (req, res) => {
        const admin = await checkIfAdmin(req.user)
        if (!admin) {
            res.render('error.ejs', {info: "You need admin privileges for that."})
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
            res.render('error.ejs', {info: "Error creating new user."})
        }
    },

    // Read, add, update, delete students

    getStudent: async (req, res) => {
        let student = await Student.find({id: Number(req.params.id)}).lean()
        student = student[0]
        if (student) {
            return res.render('student.ejs', {info: student})
        }
        else {
            res.render('error.ejs', {info: "Student not found."})
        }
    },

    addStudent: async (req, res) => {
        const user = req.user
        const admin = await checkIfAdmin(user)
        if (!admin) {
            res.render('error.ejs', {info: "You need admin privileges for that."})
        }
        const body = req.body
        if (!body || !body.firstName || !body.lastName) {
            res.render('error.ejs', {info: "Missing data to add student entry."})
        }
        const id = await getId()
        const student = new Student({
            id: id,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            dateOfBirth: body.dateOfBirth
        })
        try {
            await student.save()
        } catch(err) {
            res.render('error.ejs', {info: "Error saving new student."})
        }
        res.redirect('/')
    },

    updateStudent: async (req, res) => {
        const user = req.user
        const admin = await checkIfAdmin(user)
        if (!admin) {
            res.render('error.ejs', {info: "You need admin privileges for that."})
        }
        const body = req.body
        const id = req.params.id
        let student = await Student.find({id: id}).exec()
        student = student[0]
        if (!body || !id || !student) {
            res.render('error.ejs', {info: "Missing data to update student entry."})
        }
        student.firstName = body.firstName
        student.lastName = body.lastName
        student.dateOfBirth = body.dateOfBirth
        student.email = body.email
        try {
            await student.save()
            res.redirect('/')
        } catch (err) {
            res.render('error.ejs', {info: "Error saving updated student."})
        }
    },

    deleteStudent: async (req, res) => {
        const user = req.user
        const admin = await checkIfAdmin(user)
        if (!admin) {
            res.render('error.ejs', {info: "You need admin privileges for that."})
        }
        const id = req.params.id
        let student = await Student.find({id: id}).exec()
        student = student[0]
        if (!id || !student) {
            res.render('error.ejs', {info: "Missing data to delete student entry."})
        }
        const deleted = await Student.deleteOne({id: id})
        if (deleted.deletedCount) {
            res.redirect('/')
        } else {
            res.render('error.ejs', {info: "Error deleting student."})
        }
    },


}