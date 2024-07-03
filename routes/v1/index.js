const Router = require('express').Router()
const User = require('./user')
const Records = require('./records')

const key = require('./key')
const operation = require('./operation')
const operation_key = require('./operation_key')
const subOperation = require('./subOperation')
const well = require('./well')
const dashboard =require('./dashboard')
const employee = require('./employee')
const fuel = require('./fuel')
Router.use("/user", User /* 
#swagger.tags = ['User'] 
*/)
Router.use("/records", Records, /* 
#swagger.tags = ['Records'] 
*/)
Router.use("/key", key /*#swagger.tags = ['Keys']*/)
Router.use("/operation", operation /*#swagger.tags = ['Operations']*/)
Router.use("/operation-key", operation_key /*#swagger.tags = ['Keys']*/)
Router.use("/sub-operation", subOperation /*#swagger.tags = ['Sub Operations']*/)
Router.use("/well", well /*#swagger.tags = ['Wells']*/)
Router.use("/dashboard", dashboard /*#swagger.tags = ['Dasboard']*/)
Router.use("/employee", employee /*#swagger.tags = ['Employee']*/)
Router.use("/fuel", fuel /*#swagger.tags = ['Fuel']*/)
module.exports = Router