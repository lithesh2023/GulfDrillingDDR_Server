const Router = require('express').Router()

const Employee = require('../../model/employee')

const { authenticateToken } = require('../../utils/auth')
Router.use(authenticateToken)


Router.post("/", async (req, res) => {
  try {
    const { crew, Name, empNumber, Designation } = req.body
    const existingUser = await Employee.findOne({ empNumber })
    if (existingUser) {
      return res.status(400).json({ message: "Employee already exists" })
    }
    // Create new employee
    const newEmployee = new Employee({ crew, Name, empNumber, Designation })
    newEmployee
      .save()
      .then(() => {
        res.status(201).json({ message: "Employee added successfully" })
      })
      .catch((error) => console.log(error.message))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
Router.get('/POB', async (req, res) => {
  // Get today's date at midnight
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // Get the date for the end of today
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const employees = await Employee.find({
    POBDate: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  })
  res.status(200).json({
    employees
  })
})
Router.get('/', async (req, res) => {
  const employees = await Employee.find({})
  res.status(200).json({
    employees
  })
})
Router.put("/addCrew", async (req, res) => {

  try {
    const employees = req.body
    console.log(req.user)
    
    const promises = employees.map((employee) => {
      return Employee.findByIdAndUpdate(employee.id, { POBDate: Date.now(),unit:req.user.unit })
    })

    await Promise.all(promises)
    res.status(200).send("Updated")
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})
Router.put("/:id", async (req, res) => {

  try {
    const id = req.params.id
    const update = req.body
    let crew = await Employee.findByIdAndUpdate(id, update)
    res.status(200).send("Updated")
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

Router.delete("/:id", async (req, res) => {

  try {
    const id = req.params.id
    await Employee.findByIdAndDelete(id)
    res.status(200).send("Deleted")
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}


)
module.exports = Router