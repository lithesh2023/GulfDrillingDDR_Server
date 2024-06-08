const Router = require('express').Router()

// const {authenticateToken}= require('../../utils/auth')
// Router.use(authenticateToken)
const Keyword = require('../../model/keyword')
Router.post("/",async(req,res)=>{
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
Router.get("/:key",async (req,res)=>{
const key = req.params.key
console.log("Key",decodeURIComponent(key))
const data = await Keyword.find({key_name:decodeURIComponent(key)}).select('values')
const result = ["Code 1","Code 2","Code 3"]
res.status(200).send(data)
})
Router.put("/:id",(req,res)=>{
  
})

module.exports= Router