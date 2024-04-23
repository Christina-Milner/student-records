const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, // finish reading https://www.mongodb.com/blog/post/generating-globally-unique-identifiers-for-use-with-mongodb to sort this out
    name: String,
    email: String,
    dateOfBirth: Date,
  })

  module.exports = mongoose.model('Student', StudentSchema)