
const flight_bl = require('../flight-service-bl')



const updateAirline = async (req, res) => {
    try{
        id = req.body.id
        airline_name = req.body.airline_name
        country_id = req.body.country_id
        user_id = req.body.country_id
        console.log(id)
        const result = await flight_bl.updateAirline(id, airline_name, country_id, user_id)
        res.status(200).json({
            res:'sucsess',
            url: '/admin/airlines/' ,
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


const removeAirline = async (req, res) => {
    try{
        id = req.params.id
        const result = await flight_bl.removeAirline(id)
        await res.status(200).json({
            res:'sucsess',
            url: '/admin/airlines/' ,
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



const getAllCustomers = async(req, res) => {
    try{
        customers = await flight_bl.getAllCustomers()
        await res.status(200).json( customers ) 
    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            message: e.message
        })
    }
}

const getCustomerById = async (req, res) => {
    try{
        id = req.params.id
        const customer = await flight_bl.getCustomerById(id)
        await res.status(200).json( customer )

    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            message: e.message
        })
    }
}

const removeCustomer = async(req, res) => {
    try{
        id = req.params.id
        const result = await flight_bl.removeCustomer(id)
        await res.status(200).json({
            res:'sucsess',
            url: '/admin/customers/' ,
            result
        })
    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            // message: e.message,
            message: `you need to delete the tickets of that user !`
        })
    }
}

const getAllUsers = async(req, res) => {
    try{
        users = await flight_bl.getAllUsers()
        await res.status(200).json( users )
    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            message: e.message
        })
    }
}


const getUserById = async(req, res) => {
    try{
        id = req.params.id
        const customer = await flight_bl.getUserById(id)
        res.status(200).json( customer )
    }
    catch(e) {
        res.status(400).json({
            status:'fail',
            message: e.message
        })
    }
}


module.exports = {
    updateAirline,
    removeAirline,
    getAllCustomers,
    getCustomerById,
    removeCustomer,
    getAllUsers,
    getUserById
}