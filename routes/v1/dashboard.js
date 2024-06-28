const Router = require('express').Router()

const Well = require('../../model/well')
const User = require('../../model/user')
const Employee = require('../../model/employee')
const { authenticateToken } = require('../../utils/auth')
Router.use(authenticateToken)
Router.get('/', async (req, res) => {

    const wellCount = await Well.countDocuments()
    const userCount = await User.countDocuments()
    // Get today's date at midnight
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Get the date for the end of today
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const POB = await Employee.countDocuments({
        unit: req.user.unit, POBDate: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    })
    res.status(200).json({
        wellCount, userCount, POB
    })
})
module.exports = Router