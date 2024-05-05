const User = require('../models/User')
const Counter = require('../models/Counter')

module.exports = {
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
        return user && user.isAdmin
    },
  }