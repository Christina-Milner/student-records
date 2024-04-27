const Student = require('../models/Student')
const User = require('../models/User')
const Counter = require('../models/Counter')

module.exports = {
    // Helpers
    getId: async () => {
        const counterID = "662d1e486dda1335f1bb1429"
        let count = await Counter.findById(counterID)
        count.count += 1
        await count.save()
        return count.count
    },
    checkIfAdmin: async (id) => {
        const findMe = await User.find({_id: id}).exec()
        const user = findMe[0]
        console.log(user)
        return user && user.isAdmin
    },
    // Get - allowed for admin & non-admin
    getList: async (req, res) => {
        const data = await Student.find({}).lean()
        return res.json(data)
    },
    getStudent: async (req, res) => {
        const student = await Student.find({id: Number(req.params.id)}).lean()
        if (student) {
            return res.json(student)
        }
        else {
            res.status(404).end()
        }
    },
    // CUD - admin only
    addStudent: async (req, res) => {
        const user = req.user
        const admin = await module.exports.checkIfAdmin(user)
        if (!admin) {
            res.status(403).end()
        }
        const body = req.body
        if (!body || !body.firstName || !body.lastName) {
            return res.status(400).json({
                error: "No info or name missing."
            })
        }
        const id = await module.exports.getId()
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
            res.status(500).end()
        }
        return res.json(student)
    },

    updateStudent: async (req, res) => {
        const user = req.user
        const admin = await module.exports.checkIfAdmin(user)
        if (!admin) {
            res.status(403).end()
        }
        const body = req.body
        const id = req.params.id
        let student = await Student.find({id: id}).exec()[0].lean()
        if (!body || !id || !student) {
            return res.status(400).json({
                error: "Student not found."
            })
        }
        student.firstName = body.firstName
        student.lastName = body.lastName
        student.dateOfBirth = body.dateOfBirth
        student.email = body.email
        student.save((err, res) => {
            if (err) {
                res.status(500).end()
            } else {
                return res.json(student)
            }
        })
    },
    deleteStudent: async (req, res) => {
        const user = req.user
        if (!this.checkIfAdmin(user)) {
            res.status(403).end()
        }
        const id = req.params.id
        let student = await Student.find({id: id}).exec()[0].lean()
        if (!id || !student) {
            return res.status(400).json({
                error: "Student not found."
            })
        }
        const deleted = await Student.deleteOne({id: id})
        if (deleted.deletedCount) {
            return res.json(student)
        } else {
            return res.status(500).json({
                error: "Error deleting student."
            })
        }
    }
}