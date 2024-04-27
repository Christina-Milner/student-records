const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
    count: Number,
  })

  module.exports = mongoose.model('Counter', CounterSchema)