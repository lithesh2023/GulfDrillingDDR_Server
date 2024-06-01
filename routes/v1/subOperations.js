const Router = require('express').Router()
// const {authenticateToken}= require('../../utils/auth')
// Router.use(authenticateToken)
const SubOperation = require('../../model/sub_operation')
Router.get("/:id",(req,res)=>{

})
Router.post("/",(req,res)=>{
   
    const {StartTime,EndTime,Category,Type,description,SubOpCOde,Description,Operation} = req.body
    const subOp = new SubOperation({StartTime,EndTime,Category,Type,description,SubOpCOde,Description,Operation})
    subOp
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