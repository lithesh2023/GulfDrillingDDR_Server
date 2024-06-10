const express = require("express")
const User = require("../../model/user")
const router = express.Router()
const { generateToken } = require("../../utils/auth")
const bcrypt = require("bcryptjs")
const { updateUserDetails } = require('../../controllers/user')
const Well = require("../../model/well")
// Create a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = new User({ name, email, password })
    await user.save()
    res.send(user)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user)
    const currentUser={
      name:user.firstname+' '+user.lastname,
      email:user.email,
      well:user.well
    }
    res.json({ token,currentUser })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Register endpoint
router.post("/register", async (req, res) => {
  try {

    console.log(req.body)
    // Extract username and password from request body
    const { firstname,lastname, password, email, phone } = req.body
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({ firstname,lastname, password: hashedPassword, email, phone })
    newUser
      .save()
      .then(() => {
        res.status(201).json({ message: "User registered successfully" })
      })
      .catch((error) => console.log(error.message))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

const { authenticateToken } = require("../../utils/auth")
router.use(authenticateToken)

router.put('/addfriend',async(req,res)=>{
  const { id } = req.user
  console.log('body',req.body)
  try {
    const friend = await User.findOne({email:req.body.email})
    if(friend){
      const user = await User.findByIdAndUpdate(
        id,
        {friends: [friend.id]},
        { new: true }
      )
      res.send(user)
    }
    else{
      res
    }
    
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})
router.put('/addwell/:id',async(req,res)=>{
  const { well_id } = req.params.id
  
  try {
    const well = await Well.findById(well_id)
    if(well){
      const user = await User.findByIdAndUpdate(
        id,
        {well: [well.id]},
        { new: true }
      )
      res.send(user)
    }
    else{
      res
    }
    
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})
// Update a user
router.put("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {...req.body },
      { new: true }
    )
    res.send(user)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})
// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)
    res.send(user)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

module.exports = router
