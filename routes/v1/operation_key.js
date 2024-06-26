const Router = require('express').Router()
const {authenticateToken}= require('../../utils/auth')
Router.use(authenticateToken)
const Operation = require('../../model/operation_key')
Router.get("/:key",(req,res)=>{
    
})
Router.post("/",(req,res)=>{
  
    const {operation_name,value,description='NA',department='NA'} = req.body
    const operation = new Operation({operation_name,value,description,department})
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