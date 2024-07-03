const Router = require('express').Router()

const { FuelConsumption, FuelRecieved } = require('../../model/fuel')

const { authenticateToken } = require('../../utils/auth')
Router.use(authenticateToken)
Router.get("/:id", (req, res) => {

})
Router.post("/add", (req, res) => {
    const { date,  fuelType="Diesel", volume, location, unit } = req.body
    try {
        const fuel = new FuelRecieved({ date, fuelType, volume, location, unit })
            .save()
            .then((result) => {

                res.status(201).json({
                    success: true,
                    data: result,
                })

            })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Error Occured")
    }
})
Router.post("/consume", (req, res) => {
    const { date, number,type="Vehicle", fuelType="Diesel", volume, location, unit } = req.body
    try {
        const fuel = new FuelConsumption({ date, number,type, fuelType, volume, location, unit })
            .save()
            .then((result) => {

                res.status(201).json({
                    success: true,
                    data: result,
                })

            })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Error Occured")
    }
})
Router.post("/consume", (req, res) => {
    const { type, date, number, fuelType, volume, location, hoist } = req.body
    try {
        const fuel = new FuelRecieved({ type, date, number, fuelType, volume, location, hoist })
            .save()
            .then((result) => {

                res.status(201).json({
                    success: true,
                    data: result,
                })

            })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Error Occured")
    }
})
Router.get("/", async (req, res) => {

    let result = await FuelConsumption.find({})
    const fuelConsumptionData = result.map((fuel)=>{
        return {
            "id":  fuel._id,
            "date": fuel.date,
            "number":fuel.number,
            "fuelType": fuel.fuelType,
            "volume": fuel.volume,
            "location": fuel.location,
            "hoist": fuel.hoist,
        }
    })
    result = await FuelRecieved.find({})
     
    const fuelRecievedData = result.map((fuel)=>{
        return {
            "id":  fuel._id,
            "date": fuel.date,
            "fuelType": fuel.fuelType,
            "volume": fuel.volume,
            "location": fuel.location,
            "hoist": fuel.hoist,
        }
    })
    const consumption = await FuelConsumption.aggregate([{
        $group: {
            _id: null,
            totalLtrsConsumed: { $sum: "$volume" }
        }
    }])
    const recived = await FuelRecieved.aggregate([{
        $group: {
            _id: null,
            totalLtrsConsumed: { $sum: "$volume" }
        }
    }])
    res.status(200).json({
        fuelRecievedData,
        fuelConsumptionData,
        "consumption": consumption,
        "recived": recived
    })
})
Router.put("/fuelconsumption/:id", async(req, res) => {
  
    const id = req.params.id
    
    await FuelConsumption.findByIdAndUpdate( id,
        { ...req.body },
        { new: true })
    res.status(200).send("Updated")
})
Router.put("/fuelrecieve/:id", async(req, res) => {
    
    const id = req.params.id
 
    await FuelRecieved.findByIdAndUpdate( id,
        { ...req.body },
        { new: true })
    res.status(200).send("Updated")
})
module.exports = Router