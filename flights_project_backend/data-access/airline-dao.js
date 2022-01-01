

const connectedKnex = require('../knex-connector.js')


//  get all countries - all users 
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


const update_airline = async (id, airlin_name, country_id, user_id) => {
    // if (typeof id !== 'Number' || typeof airlin_name !== 'String' || typeof country_id !== 'Number' || user_id != 'Number') {
    //     console.log('type not valid')
    //     return 'type not valid'
    // }
    if (id === null || airlin_name === null || country_id === null || user_id === null) {
        console.log('one input is null') 
        return 'one input is null' 
    }
    else {
        try{
            const result = await connectedKnex.raw(`select * from sp_update_airline(${id},'${airlin_name}',${country_id},${user_id})`)
            console.log(result.rows[0].sp_update_airline) 
            return result.rows[0].sp_update_airline
        } 
        catch (e) {
            console.log(e)
        }
    }
}


const insert_flight = async(airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_insert_flight(${airline_id},${origin_country_id},${destination_country_id},${departure_time},${landing_time},${remaining_tickets})`)
        console.log(result.rows[0].sp_insert_flight)
        return result.rows[0].sp_insert_flight
    }
    catch(e) {
        console.log(e)
    }
}


const update_flight = async(id, airline_id, origin_country_id, dastination_country_id, departure_time, landing_time, remaining_tickets) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_update_flight(${id},${airline_id},${origin_country_id},${dastination_country_id},${departure_time},${landing_time},${remaining_tickets})`)
        console.log(result.rows[0].sp_update_flight)
        return result.rows[0].sp_update_flight
    }
    catch(e) {
        console.log(e)
    }
}


const delete_flights_by_id = async (id) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_delete_flights_by_id(${id})`)
        console.log(result.rows[0].sp_delete_flights_by_id) 
        return result.rows[0].sp_delete_flights_by_id
    } 
    catch (e) {
        console.log(e)
    }
}

// tests-----------------------------------------------------------------------------------------
// get_all_countries()                 // v 
// update_airline()                    // v returns object of the number updetes record
// SQL לסדר את הפונקציה ב 
// insert_flight()                     //  need to format time (Day.js) type timestamp !!
// עובד אבל לבדוק שןב 
// מחזיר את מספר הרשומות שעודכנו
// timestamp = string מקבל זמן כ
// update_flight(34, 7, 33, 39,'2021-01-02 18:00', '2021-01-02 21:15', 20)            
// delete_flights_by_id()   // עובד מחזיר את מספר הרשומות שנמחקו 
//******* 
// to input time stempe !
//dep_time = dayjs(`${month}-${day}-${year} ${dep_hour}:${dep_min}`).format('DD-MM-YYYY HH:MM')
// --------------------------------------------------------------------------------------------


module.exports = {
    get_all_countries,
    update_airline,
    insert_flight,
    update_flight,
    delete_flights_by_id,
    
}