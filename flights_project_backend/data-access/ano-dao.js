//DAO

const connectedKnex = require('../knex-connector.js')


// get all airlines
const get_all_airlines = async () => {
    try{
        const result = await connectedKnex.raw(`select * from sp_get_all_airlines()`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}


// get airline by id
const get_airline_by_id = async (id) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_get_airline_by_id(${id})`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}



// insert customer
const insert_customer = async (first_name, last_name, address, phone_no, card_no, user_id) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_insert_customer('${first_name}','${last_name}','${address}','${phone_no}','${card_no}',${user_id})`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e.code)
        if (e.code === '23505') {
            console.log(e.detail)
        }
    }
}

// get all flights 
const get_all_flights = async () => {
    try{
        const result = await connectedKnex.raw(`select * from sp_get_all_flights()`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}




// get flights by airline id -- join
const get_flights_by_airline_id = async (id) => {
    try{
        const result = await connectedKnex.raw(`select * from get_flights_by_airline_id(${id})`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}


// 
const get_flights_by_parameters = async (origin_country_id, destination_country_id, date) => {
    try{
        const result = await connectedKnex.raw(`select * from get_flights_by_parameters(${origin_country_id},${destination_country_id},'${date}')`)
        console.log(result.rows[0]) 
        return result.rows[0]
    } 
    catch (e) {
        console.log(e)
    }
}


// get arrivel flights
const get_arrival_flights = async () => {
    try{
        const result = await connectedKnex.raw(`select * from get_arrival_flights()`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}



// get departure flights
const get_departure_flights = async () => {
    try{
        const result = await connectedKnex.raw(`select * from get_departure_flights()`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}


//get all countries 
const get_all_countries = async () => {
    try{
        const result = await connectedKnex.raw(`select * from sp_get_all_countries()`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}

const get_flight_by_id = async (id) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_get_flights_by_id(${id})`)
        console.log(result.rows) 
        return result.rows
    }
    catch(e) {
        console.log(e)
    }
}


// tests-------------------------------------------------------------------------------------------------------
// get_all_airlines()                             //v returns list of objects
// get_airline_by_id()                            //v returns aobject or undefinded if record not found 
// לבדוק!
// שנוצר id אם מצליח מחזיר את ה
// insert_customer()                               //v // צריך להיות קשר בין טבלאות !
// get_all_flights()                               //v returns lkist of objects      
// get_flights_by_airline_id()                         //v // צריך להיות קשר בין טבלאות !
// get_flights_by_parameters()                     //v // timestame: as string in input !! // returns object
// get_departure_flights()                         //v // לצורך הזמנים שנרצה SQL לשנות ב // returns list of objects
// get_arrival_flights()                           //v // לצורך הזמנים שנרצה SQL לשנות ב // returns list of objects
// get_all_countries()                             //v // returns listf of contreis objects
// get_flight_by_id()                              //v // 
// --------------------------------------------------------------------------------------------------------------------

module.exports = {
    get_all_airlines,
    get_airline_by_id,
    insert_customer,
    get_all_flights,
    get_airline_by_id,
    get_flights_by_airline_id,
    get_flights_by_parameters,
    get_departure_flights,
    get_arrival_flights,
    get_all_countries,
    get_flight_by_id
}


