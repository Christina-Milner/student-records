const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    firstName: String,
    lastName: String,
    email: String,
    dateOfBirth: String,
    // Mongo seems to be a PITA about dates and we don't actually need this for anything
  })

  module.exports = mongoose.model('Student', StudentSchema)