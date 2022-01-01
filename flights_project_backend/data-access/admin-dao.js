
// DAO  aadmin


const connectedKnex = require('../knex-connector.js')


// delete all data !!! - admin only
const delete_and_reset_all = async () => {
    try{
        console.log('delete all flights-manager data')
        const result = await connectedKnex(`call sp_delete_and_reset_all()`)
        console.log(result)
        return 
    }
    catch (e) {
        console.log(e)
    }
}

// delete all customers - admin only
const delete_and_reset_customers = async () => {
    try{
        console.log('delete all customers table')
        return await connectedKnex(`call sp_delete_and_reset_customers()`)
    } 
    catch (e) {
        console.log(e)
    }
}


// delete all countries - admin only
const delete_and_reset_countries = async () => {
    try{
        console.log('delete all countries table')
        return await connectedKnex.raw(`call sp_delete_and_reset_countries()`)
    } 
    catch (e) {
        console.log(e)
    }
}

// delete all airlines - admin only
const delete_and_reset_airlines = async () => {
    try{
        console.log('delete all airlines table')
        return await connectedKnex(`call sp_delete_and_reset_airlines()`)
    } 
    catch (e) {
        console.log(e)
    }
}

// delete all flights - admin only
const delete_and_reset_flights = async () => {
    try{
        console.log('delete all flights table')
        return await connectedKnex(`call sp_delete_and_reset_flights()`)
    } 
    catch (e) {
        console.log(e)
    }
}

// delete all tickets - admin only
const delete_and_reset_tickets = async () => {
    try{
        console.log('delete all tickets table')
        return await connectedKnex(`sp_delete_and_reset_tickets()`)
    } 
    catch (e) {
        console.log(e)
    }
}


// delete all users - admin only
const sp_delete_and_reset_users = async () => {
    try{
        console.log('delete all users table')
        return await connectedKnex(`call sp_delete_and_reset_users()`)
    } 
    catch (e) {
        console.log(e)
    }
}



//  get all airlines - all users 
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

//  get all customers - all users 
const get_all_customers = async () => {
    try{
        const result = await connectedKnex.raw(`select * from sp_get_all_customers()`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}

//
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


//
const get_all_users = async () => {
    try{
        const result = await connectedKnex.raw(`select * from sp_get_all_users()`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}


//
const get_all_tickets = async () => {
    try{
        const result = await connectedKnex.raw(`select * from sp_get_all_tickets()`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}


//
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


// const update_airline = async (id, airline_name, country_id, user_id) => {
//     // console.log(id, airline_name, country_id, user_id)
//     // if ( typeof airline_name != 'string' || typeof country_id != 'number') {
//     //     // console.log(`input not valid`)
//     //     // return `input not valid`
//     // }
//     // if (id === null || airline_name === null || user_id === null) {
//     //     // console.log(`input is null`)
//     //     // return `input is null`
//     // } 
//     // else {
//         try{
//             const result = await connectedKnex.raw(`select * from sp_update_airline(${id}, '${airline_name}',${country_id} ,${user_id})`)
//             console.log(result.rows) 
//             return result.rows
//         } 
//         catch(e) {
            
//             console.log('dao:' + e)
//         }
//     // }
// }


const delete_airline_by_id = async (id) => {
    // if (typeof id != 'number' || id === null) {
    //     console.log(`input not valid`)
    //     return `input not valid`
    // } 
    // else {
        try{
            const result = await connectedKnex.raw(`select * from sp_delete_airline_by_id(${id})`)
            console.log(result.rows[0]) 
            return result.rows[0]
        } 
        catch (e) {
            console.log(e.detail)
        }
    // }
    
}


const update_customer = async (id, first_name, last_name, address, phone_no, card_no, user_id) => {
    if (typeof id != 'number' || typeof first_name != 'string' || typeof user_id != 'number') {
        console.log(`input not valid`)
        return `input not valid`
    }
    else if (id === null || first_name === null || user_id === null ) {
        console.log(`input is null`)
        return `input is null`
    }
    else{
        try{
            const result = await connectedKnex.raw(`select * from sp_update_customer(${id},'${first_name}','${last_name}','${address}','${phone_no}','${card_no}',${user_id})`)
            console.log(result.rows[0]) 
            return result.rows[0]
        } 
        catch (e) {
            console.log(e)
        }
    }
}

const delete_customer_by_id = async (id) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_delete_customer_by_id(${id})`)
        // console.log(result.rows[0]) 
        return result.rows[0]
    } 
    catch (e) {
        if (e.code === '23503') {
            console.log('you need to delete the tickets of that user ! ')
            // console.log(e)
            throw e
            
        }
    }
   
}


const get_user_by_id = async (id) => {
    if(id === null || id <= 0 ) {
        console.log(`input not valid`)
        return `input not valid`
    }
    else{
        try{
            const result = await connectedKnex.raw(`select * from sp_get_user_by_id(${id})`)
            console.log(result.rows[0]) 
            return result.rows[0]
        } 
        catch (e) {
            console.log(e.detail)
        }
    }
}



// ******************************************
const insert_airline = async (name, country_id, user_id) => {
    if (typeof name != 'string' || typeof country_id != 'number' || typeof user_id != 'number') {
        console.log('the input not valid')
        return 'the input not valid'
    }
    else if (name === null || country_id === null || user_id === null) {
        console.log('some input are null')
        return 'some input are null'
    }
    else {
        try{
            console.log(typeof name)
            const result = await connectedKnex.raw(`select * from sp_insert_airline('${name}','${country_id}',${user_id})`)
            console.log(result.rows[0].sp_insert_airline) 
            return result.rows[0].sp_insert_airline
        } 
        catch (e) {
            // console.log(e)
            // console.log(e.detail, e.code, e.severity, e.routine)
            if (e.code === '23505') {
                console.log(e.detail, e.code, e.severity, e.routine)
            }
        }
    }
}



// tests------------------------------------------------------------------------------------------
// get_all_flights()
// get_all_tickets()
// get_all_users()
// get_all_airlines()
// get_all_customers()
// get_all_countries()

// delete_and_reset_all()
// delete_and_reset_customers()
// delete_and_reset_countries()
// delete_and_reset_airlines()
// delete_and_reset_flights()
// delete_and_reset_tickets()
// sp_delete_and_reset_users()

// update_airline()                         //v מחזיר את מספר הרשומות שעודכנו
// delete_airline_by_id()                   //v מחזיר את מספר הרשומות שנמחקו 
// update_customer()                        //v מחזיר את מספר הרשומות שעודכנו בדר"כ 1
// delete_customer_by_id()                  // !! tickets יש יחס עם טבלת 
// get_user_by_id()                         //v User מחזיר אובייקט 
// insert_airline()                         //v של החברה שנוצרה id מחזיר את ה 

// להוסיף
// remove tickets by user id !!
//-----------------------------------------------------------------------------------------------

module.exports = {
    // update_airline,
    delete_airline_by_id,
    update_customer,
    delete_customer_by_id,
    get_user_by_id,
    insert_airline,
    // 
    get_all_flights,
    get_all_tickets,
    get_all_users,
    get_all_airlines,
    get_all_customers,
    get_all_countries,
    delete_and_reset_all,
    delete_and_reset_customers,
    delete_and_reset_countries,
    delete_and_reset_airlines,
    delete_and_reset_flights,
    delete_and_reset_tickets,
    sp_delete_and_reset_users
}

