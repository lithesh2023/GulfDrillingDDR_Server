const Router = require('express').Router()
const {authenticateToken}= require('../../utils/auth')
Router.use(authenticateToken)
Router.get("/:id",(req,res)=>{

})
Router.post("/:",(req,res)=>{
  
})
Router.get("/",(req,res)=>{

})
Router.put("/:id",(req,res)=>{
  
})

module.exports= Router