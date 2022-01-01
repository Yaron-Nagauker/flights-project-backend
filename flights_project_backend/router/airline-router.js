const { Router } = require('express')
const airlinectrl = require('../ctrls/airline-ctrl')
const anoctrl = require('../ctrls/ano-ctrl')
const router = Router();


// airline ruoter
router.get('/airline/flights', anoctrl.getAllFlights)                        //v
router.post('/airline/flights', airlinectrl.addFlight)                       //v
router.delete('/airline/flights/:id', airlinectrl.removeFlight)              //v
router.put('/airline/flights', airlinectrl.updateFlight)                     //v

module.exports = router