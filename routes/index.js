const Router = require('express').Router()
const v1 = require('./v1')

Router.use("/v1",v1/* 
#swagger.tags = ['Version 1'] 
*/)


module.exports = Router