const Router = require('express').Router()

const Well = require('../../model/well') 
const User = require('../../model/user')
const Employee =require('../../model/employee')
const {authenticateToken}= require('../../utils/auth')
Router.use(authenticateToken)
Router.get('/',async (req,res)=>{
   
    const wellCount = await Well.countDocuments()
    const userCount = await User.countDocuments()
    const POB =  await Employee.countDocuments({unit:req.user.unit})
    res.status(200).json({
        wellCount,userCount,POB
    })
})
module.exports = Router