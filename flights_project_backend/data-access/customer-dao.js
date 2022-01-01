

const connectedKnex = require('../knex-connector.js')


const get_customer_by_id = async (id) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_get_customer_by_id(${id})`)
        console.log(result.rows[0]) 
        return result.rows[0]
    } 
    catch (e) {
        console.log(e)
    }
}

const update_customer = async (id, first_name, last_name, address, phone_no, card_no, user_id) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_update_customer(${id},'${first_name}','${last_name}','${address}','${phone_no}','${card_no}',${user_id})`)
        console.log(result.rows[0].sp_update_customer) 
        return result.rows[0].sp_update_customer
    } 
    catch (e) {
        console.log(e)
    }
}


// join ! 
const get_tickets_by_customer_id = async (id) => {
    try{
        const result = await connectedKnex.raw(`select * from get_tickets_by_customer_id(${id})`)
        console.log(result.rows[0]) 
        return result.rows[0]
    } 
    catch (e) {
        console.log(e)
    }
}


const insert_tickets = async (flight_id, customer_id) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_insert_tickets(${flight_id},${customer_id})`)
        console.log(result.rows[0].sp_insert_tickets) 
        return result.rows[0].sp_insert_tickets
    } 
    catch (e) {
        console.log(e)
        if (e.code === '23503') {
            console.log(e.detail)
            throw e
        }
    }
}

const delete_tickets_by_id = async (id) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_delete_tickets_by_id(${id})`)
        console.log(result.rows[0].sp_delete_tickets_by_id) 
        return result.rows[0].sp_delete_tickets_by_id
    } 
    catch (e) {
        console.log(e)
    }
}

// tests--------------------------------------------------------------------------------------------------------
// get_customer_by_id()                                          //v //returns customer object
// update_customer()                                              //v //retruns number of updeted records
// insert_tickets()                                               //v // retern the id of the tickets
// delete_tickets_by_id()                                         //v // returns the number of deleted records
// get_tickets_by_customer_id()                                   //v returns object of join customer and ticket
// --------------------------------------------------------------------------------------------------------------

module.exports = {
    get_customer_by_id,                                          
    update_customer,                                            
    insert_tickets,                                               
    delete_tickets_by_id,                                         
    get_tickets_by_customer_id,  
}