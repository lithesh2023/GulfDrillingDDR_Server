const Router = require("express").Router()
const multer = require("multer")
const excelToJson = require("convert-excel-to-json")
const fs = require("fs")
const { authenticateToken } = require("../../utils/auth")
Router.use(authenticateToken)
const Expense = require("../../model/expense")
const { getExpenseByUser } = require('../../controllers/expense')
const mongoose = require('mongoose');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + ".xls")
  },
})
const upload = multer({ storage: storage })

Router.post("/import", upload.single("file"), async function (req, res, next) {
console.log(req.file.path)
  let expenseData = []
  const result = await excelToJson({
    sourceFile: req.file.path,
    columnToKey: {
      "*": "{{columnHeader}}",
    },
    header: {
      rows: 1,
    }
  })
  result.Sheet1.forEach((element) => {
    expenseData.push({
      TxnDate: element.TxnDate,
      Description: element.Description,
      TxnAmount: element.Debit,
      user: req.user.id
    })
  })

  try {
    // Delete the file like normal
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error(err)
        return
      }

      //file removed
    })
    console.log('Expense Data',expenseData)
    await Expense.insertMany(expenseData)
    res.status(201).json({
      success: true,
      data: "Successfully imported the expenses",
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      data: "Error while importing document",
    })
  }
})
Router.delete("/", async (req, res) => {
  Expense.deleteMany({})
    .then(() => {
      res
        .status(200)
        .send({ success: true, message: "Successfully Deleted all Expenses" })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).send({ success: false, message: "Error occured" })
    })
})
Router.get("/dashboard", (req, res) => {
  console.log("USer",req.user.id)
  Expense.aggregate([
    { $match : { user : new mongoose.Types.ObjectId(req.user.id)} },
    {
      $group: {
        _id: null,
        total: { $sum: "$TxnAmount" }, // Assuming 'field1' is the field you want to sum
      },
    },
    {
      $project: {
        _id: 0, // Exclude _id field from the output
        total: 1, // Include 'total' field in the output
      },
    },
  ])
    .then((result) => {
      res.status(200).json(result[0])
    })
    .catch((error) => {
      console.error(error) // Handle errors
      res.status(400).json({ success: false, message: "Error occured" })
    })
})
Router.get("/", async (req, res) => {
  const userId = req.user.id // Replace with the actual user ID
  getExpenseByUser(userId)
    .then((expenses) => {
      console.log("Expenses:", expenses)
      res.status(200).json(expenses)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
})
Router.get("/:id", async (req, res) => {
  const id = req.params.id
  Expense.findById(id)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        data: null,
      })
    })
})
Router.post("/", (req, res) => {

  const exp = {...req.body,user: req.user.id}
  const expense = new Expense(exp)
  console.log(exp)
  expense
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

module.exports = Router
