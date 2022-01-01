const { Router } = require('express')
const anoctrl = require('../ctrls/ano-ctrl')
const router = Router();

router.get('/ano/airlines/', anoctrl.getAllAirlineCompanies)
router.get('/ano/airlines/:id', anoctrl.getAirlineById)              
router.get('/ano/flights/', anoctrl.getAllFlights)
router.get('/ano/flights/:id', anoctrl.getFlightById)
router.get('/ano/flights-airline/:id', anoctrl.getFlightsByAirlineId)
router.get('/ano/arrival-flights/', anoctrl.ArrivalFlights)              
router.get('/ano/departure-flights/', anoctrl.getDepartureFlights)       
router.get('/ano/countries/', anoctrl.getAllCountries)



module.exports =  router