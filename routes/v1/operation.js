const Router = require('express').Router()
const mongoose = require('mongoose');
// const {authenticateToken}= require('../../utils/auth')
// Router.use(authenticateToken)
const Operation = require('../../model/operation')
Router.get("/:id", async (req, res) => {

  try {
    const id = req.params.id
    const result = await Operation.find({ well: id })
    const data = result.map((operation) => {
      return {
        "id": operation.id,
        "StartDate": operation.StartDate,
        "Plan_HRS": operation.Plan_HRS,
       
        "description": operation.description,
        
        "createdBy": operation.createdBy,
        "operation_code":operation.operation_code,
        "day_number":operation.day_number
      }
    })
    res.status(200).send(data)
  }
  catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})
Router.post("/", (req, res) => {

  const { StartDate, Plan_HRS,operation_code, description, createdBy="Lithesh", well,day_number } = req.body
  const operation = new Operation({ StartDate, Plan_HRS, operation_code, description, createdBy,day_number, well })
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
Router.get("/", async (req, res) => {
  try {
    const result = await Operation.find({})
    const data = result.map((operation) => {
      return {
        "id": operation.id,
        "StartDate": operation.StartDate,
        "Plan_HRS": operation.Plan_HRS,
        "Actual_HRS": operation.Actual_HRS,
        "description": operation.description,
        "Diff_HRS": operation.Diff_HRS,
        "createdBy": operation.createdBy,
        "unit": operation.rig
      }
    })
    res.status(200).send(data)
  }
  catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})
Router.put("/:id", (req, res) => {

})

module.exports = Router