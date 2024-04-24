const Student = require('../models/Student')
const User = require('../models/User')

module.exports = {
    getList: async (req, res) => {
        const data = await Student.find({}).lean()
        return res.json(data)
    },
    addStudent: async (req, res) => {
        res.render('index.ejs', { isAuthenticated: req.isAuthenticated() })
    },
    getStudent: async (req, res) => {
        const student = await Student.find({id: Number(req.params.id)}).lean()
        return res.json(student)
    },
    updateStudent: (req, res) => {
        res.render('index.ejs', { isAuthenticated: req.isAuthenticated() })
    },
}



/*
router.get('/api/students', ensureAuth, apiController.getList)
router.post('/api/addStudent', ensureAuth, apiController.addStudent)
router.get('/api/student:id', ensureAuth, apiController.getStudent)
router.put('/api/student:id', ensureAuth, apiController.updateStudent)
router.post('/api/student:id', ensureAuth, apiController.updateStudent)
router.delete('/api/student:id', ensureAuth, apiController.deleteStudent)
*/