

const flight_bl = require('../flight-service-bl')



//v
const getAllAirlineCompanies = async (req, res) => {
    try {
      airlines = await flight_bl.getAllAirlineCompanies()
      await res.status('200').json( airlines )
    }
    catch (e) {
      res.status(400)
      console.log(e)
    }
}

//v
const getAirlineById = async (req, res) => {
    try{
        id = req.params.id
        airline = await flight_bl.getAirlineById(id)
        res.status('200').json( airline )
    } 
    catch(e) {
        res.status(400)
        console.log(e)    
    }
}

// add customer - post
// 
const addCustomer = async (req, res) => {
    try{
        customer = req.body
        const result = await flight_bl.addCustomer(customer)
        res.status(200).json({
        res:'sucsess',
        url:'localhost/8080/products/' + customer.id,
        result
        })
    }
    catch(e) {
        req.status(400).json({
            status:"fail",
            message:e.message
        })
    }
}


// !
const checkUsernameAvailability = async(req, res) => {
    ////
}


//v
const getAllFlights = async (res, req) => {
    try{
        flights = await flight_bl.getAllFlights()
        req.status(200).json(flights)
    }
    catch(e) {
        req.status(400).json({
            status:"fail",
            message:e.message
        })
    }
}


// get flight by id
//v
const getFlightById = async (res, req) => {
    try{
        id = res.params.id
        flight = await flight_bl.getFlightById(id)
        req.status(200).json( flight )
    }
    catch(e) {
        res.status(400).json({
            status:"fail",
            message:e.message
        })
    }
}


// get flights by airline id
//v
const getFlightsByAirlineId = async (req, res) => {
    try{
        id = req.params.id
        flights = await flight_bl.getFlightsByAirlineId(id)
        res.status(200).json( flights )
    }
    catch(e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}

// get Arrival Flights 
//v

const ArrivalFlights = async (req, res) => {
    try{
        flights = await flight_bl.getArrivalFlights()
        res.status(200).json( flights )  
    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            message: e.message
        })
    }
}

// get Departure Flights
//v !
const getDepartureFlights = async (req, res) => {
    try{
        flights = await flight_bl.getArrivalFlights()
        res.status(200).json( flights )
    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            message: e.message

        })
    }
}

// get all countries
// 
const getAllCountries = async (req, res) => {
    try{
        countries = await flight_bl.getAllCountries()
    res.status(200).json( countries )
    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            message: e.message
        })
    }
}



module.exports = {
    getAllAirlineCompanies,
    getAirlineById,
    getAllFlights,
    addCustomer,
    getFlightById,
    getFlightsByAirlineId,
    ArrivalFlights,
    getDepartureFlights,
    getAllCountries
}