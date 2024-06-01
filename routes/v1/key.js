const Router = require('express').Router()
// const {authenticateToken}= require('../../utils/auth')
// Router.use(authenticateToken)
const Key = require('../../model/keyword')
Router.get("/:key",(req,res)=>{
    
})
Router.post("/",(req,res)=>{
    console.log("body ",req.body)
    const {key_name,values,description='NA',department='NA'} = req.body
    const key = new Key({key_name,values,description,department})
    key
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