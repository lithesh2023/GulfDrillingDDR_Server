const Router = require('express').Router()
const well = require('../../model/well')
const mongoose = require('mongoose')
// const {authenticateToken}= require('../../utils/auth')
// Router.use(authenticateToken)
const Well = require('../../model/well')
Router.get("/:id", (req, res) => {

})
Router.post("/", (req, res) => {
    console.log("body ", req.body)
    const { well_number, rig_up_date, job_type, lti_days, client, unit, createdBy = "Lithesh" } = req.body
    const well = new Well({ well_number, rig_up_date, job_type, lti_days, contractor: client, rig: unit, createdBy })
    well
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
        const wells = await Well.find({})
        const data = wells.map((well) => {
            return {
                "id": well.id,
                "well_number": well.well_number,
                "rig_up_date": well.rig_up_date,
                "job_type": well.job_type,
                "client": well.contractor,
                "unit": well.unit,
                "lti_days": well.lti_days,
                "unit": well.rig
            }
        })
        res.status(200).send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }

})
Router.put("/:id", async (req, res) => {
    const id = req.params.id
    console.log(id, req.body)

    await Well.findByIdAndUpdate( id,
        { ...req.body },
        { new: true })
    res.status(200).send("Updated")
})
Router.delete("/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const well = await Well.findByIdAndDelete(id)
        res.status(200).send("Deleted")
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

module.exports = Router