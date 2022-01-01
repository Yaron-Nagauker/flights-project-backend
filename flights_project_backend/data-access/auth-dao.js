// login logout

const connectedKnex = require('../knex-connector.js')

const AuthUser = async (mail, pass) => {
    try{
        const result = await connectedKnex.raw(`select * from sp_auth_user('${mail}','${pass}')`)
        console.log(result.rows) 
        return result.rows
    } 
    catch (e) {
        console.log(e)
    }
}


module.exports = {
    AuthUser
}