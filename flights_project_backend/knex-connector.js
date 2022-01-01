const knex = require('knex')

const connectedKnex = knex({
    client: 'postgres',
    version: "12",
    connection: {
        host : "127.0.0.1",
        user : "postgres",
        password : "admin",
        database : "flight-manager"
    }
})

module.exports = connectedKnex;