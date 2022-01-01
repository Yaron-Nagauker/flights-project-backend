
const flight_bl = require('../flight-service-bl')


// getAllFlights // ano
// updateAirline // admin
// addFlight 
// updateFlight 
// removeFlight


const addFlight = async(req, res) => {
    try{
        airline_id = req.body.airline_id
        origin_country_id = req.body.origin_country_id
        destination_country_id = req.body.destination_country_id
        departure_time = req.body.departure_time
        landing_time = req.body.landing_time
        remaining_tickets = req.body.remaining_tickets
        const result = await flight_bl.addFlight(airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets)
        await res.status(200).json({
            res:'sucsess',
            url: '/ano/flights/',
            result
        })  
    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            message: e.message
        })
    }
}


const removeFlight = async(req, res) => {
    try{
        id = req.params.id
        const result = await flight_bl.removeFlight(id)
        await res.status(200).json({
            res:'sucsess',
            url: '/ano/flights/',
            result
        })
    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            message: e.message
        }) 
    }
}



const updateFlight = async(req, res) =>{
    try{
        id = req.body.id
        airline_id = req.body.airline_id
        origin_country_id = req.body.origin_country_id
        destination_country_id = req.body.destination_country_id
        departure_time = req.body.departure_time
        landing_time = req.body.landing_time
        remaining_tickets = req.body.remaining_tickets
        const result = await flight_bl.updateFlight(id, airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets)
        await res.status(200).json({
            res:'sucsess',
            url: '/ano/flights' ,
            result
        })
    }
    catch(e){
        res.status(400).json({
            status:'fail',
            message: e.message
        }) 
    }
}




module.exports = {
    addFlight,
    removeFlight,
    updateFlight, 
}