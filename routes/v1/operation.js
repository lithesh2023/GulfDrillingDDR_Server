const Router = require('express').Router()
// const {authenticateToken}= require('../../utils/auth')
// Router.use(authenticateToken)
const Operation = require('../../model/operation')
Router.get("/:id",(req,res)=>{

})
Router.post("/",(req,res)=>{
   
    const {StartDate,Plan_HRS,Actual_HRS=0,Diff_HRS=0,description,createdBy,well} = req.body
    const operation = new Operation({StartDate,Plan_HRS,Actual_HRS,Diff_HRS,description,createdBy,well})
    operation
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        })
      })
      .catch((error) => {
        console.log(error.message)
        res.status(400).json({
          success: false,
          data: null,
        })
      })
})
Router.get("/",(req,res)=>{

})
Router.put("/:id",(req,res)=>{
  
})

module.exports= Router