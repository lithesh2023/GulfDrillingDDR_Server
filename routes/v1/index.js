const Router = require('express').Router()
const User = require('./user')
const Records = require('./records')

const key = require('./key')
const operation = require('./operation')
const operation_key = require('./operation_key')
const subOperation = require('./subOperation')
const well = require('./well')
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
module.exports = Router