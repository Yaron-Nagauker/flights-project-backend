

const adminDao = require('./data-access/admin-dao')
const airlineDao = require('./data-access/airline-dao')
const customerDao = require('./data-access/customer-dao')
const anoDao = require('./data-access/ano-dao')
const authDao = require('./data-access/auth-dao')

const getAllAirlineCompanies = async () => {
    return await anoDao.get_all_airlines()
}

const getAirlineById = async (id) => {
    return await anoDao.get_airline_by_id(id)
}

const addCustomer = async () => {
    return await anoDao.insert_customer()
}

const getAllFlights = async () => {
    return await anoDao.get_all_flights()
}

const getFlightsByParameters = async () => {
    return await anoDao.get_flights_by_parameters()       
}


const getFlightById = async (id) => {                                    
    return await anoDao.get_flight_by_id(id)
}

const getFlightsByAirlineId = async (id) => {
    return anoDao.get_flights_by_airline_id(id)
} 

const getArrivalFlights = async () => {
    return await anoDao.get_arrival_flights()
}

const getDepartureFlights = async () => {
    return await anoDao.get_departure_flights() 
}

const getAllCountries = async () => {
    return await anoDao.get_all_countries()
}

const updateAirline = async (id, airline_name, country_id, user_id) => {
    // console.log(id, airline_name, country_id, user_id)
    return await airlineDao.update_airline(id, airline_name, country_id, user_id)                                     
}

const addFlight = async (airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets) => {
    return await airlineDao.insert_flight(airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets)
}

const updateFlight = async (id, airline_id, origin_country_id,
    destination_country_id, departure_time, landing_time, remaining_tickets) => {
    return await airlineDao.update_flight(id, airline_id, origin_country_id,
        destination_country_id, departure_time, landing_time, remaining_tickets
    )
}

const removeFlight = async (id) => {
    return await airlineDao.delete_flights_by_id(id)
}

const getCustomerById = async (id) => {
    return await customerDao.get_customer_by_id(id)
}

const updateCustomer = async () => {
    return await customerDao.update_customer()        //sign-up                  
}

const getTicketsByCustomer = async () => {
    return await customerDao.get_tickets_by_customer_id()
}

const addTickets = async (flight_id, customer_id) => {
    return await customerDao.insert_tickets(flight_id, customer_id)
}

const removeTicket = async () => {
    return customerDao.delete_tickets_by_id()
}

const removeAirline = async (id) => {
    return adminDao.delete_airline_by_id(id)
}

const getAllCustomers = async () => {
    return await adminDao.get_all_customers()
}

const removeCustomer = async (id) => {
    return await adminDao.delete_customer_by_id(id)
}

const getAllUsers = async () => {
    return await adminDao.get_all_users()
}

const getUserById = async (id) => {
    return await adminDao.get_user_by_id(id)
}

const checkUsernameAvailability = async () => {
    // !!!!!!!!!!!
}

const addAirline = async () => {
    return await adminDao.insert_airline()
}

const CheckUsername = async(mail, pass) => {
    return await authDao.AuthUser(mail, pass)
}


module.exports = {
    getAllAirlineCompanies,
    getAirlineById,
    addCustomer,
    checkUsernameAvailability,
    getAllFlights,
    getFlightById,
    getFlightsByAirlineId,
    getArrivalFlights,
    getDepartureFlights,
    getAllCountries,
    getAllCustomers,
    addTickets,
    removeTicket,
    updateAirline,
    removeAirline,
    updateCustomer,
    addFlight,
    updateFlight,
    removeFlight,
    getCustomerById,
    removeCustomer,
    getAllUsers,
    getUserById,
    getFlightsByParameters,
    getTicketsByCustomer,
    addAirline,
    CheckUsername
}

console.log("check")