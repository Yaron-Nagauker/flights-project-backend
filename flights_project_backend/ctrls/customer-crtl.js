
const req = require('express/lib/request')
const flight_bl = require('../flight-service-bl')

// getCustomerById ()
// updateCustomer ()
// getTicketsByCustomer ()
// addTicket ()
// removeTicket ()

const getCustomerById = async(req, res) => {
    try{
        custom_id = req.body.custom_id
        const result = await flight_bl.getCustomerById(customer_id)
        await res.status(200).json({
            res:'sucsess',
            url: '/customer/' + customer_id,
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


const addTickets = async(req, res) => {
    try{
        flight_id = req.body.flight_id
        customer_id = req.body.customer_id
        const result = await flight_bl.addTickets(flight_id, customer_id)
        await res.status(200).json({
            res:'sucsess',
            url: '/customer/tickets/',
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

const removeTickets = async(req, res) => {
    try{

    }
    catch (e) {

    }
}   







module.exports = {
    addTickets,
    getCustomerById
}