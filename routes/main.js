const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const apiController = require('../controllers/api')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// Main page
router.get('/', homeController.getIndex)

//Login
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout) 

//Adding users
router.post('/addUser', ensureAuth, homeController.addUser)

// Web app routes

router.post('/addStudent', ensureAuth, homeController.addStudent)
router.get('/student:id', ensureAuth, homeController.getStudent)
router.post('/student:id', ensureAuth, homeController.updateStudent)
router.post('/delStudent:id', ensureAuth, homeController.deleteStudent)

// API

router.get('/api/students', ensureAuth, apiController.getList)
router.post('/api/addStudent', ensureAuth, apiController.addStudent)
router.get('/api/student:id', ensureAuth, apiController.getStudent)
router.put('/api/student:id', ensureAuth, apiController.updateStudent)
router.post('/api/student:id', ensureAuth, apiController.updateStudent)
router.delete('/api/student:id', ensureAuth, apiController.deleteStudent)


module.exports = router