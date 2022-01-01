const { Router } = require('express')
const adminctrl = require('../ctrls/admin-ctrl')
const anoctrl = require('../ctrls/ano-ctrl')
const router = Router();


// admin router
router.get('/admin/airlines', anoctrl.getAllAirlineCompanies)
router.put('/admin/airlines', adminctrl.updateAirline)                 ///v update-page ?
router.delete('/admin/airlines/:id', adminctrl.removeAirline)          ///v update-page ?
router.get('/admin/customers', adminctrl.getAllCustomers)              //v        
router.get('/admin/customers/:id', adminctrl.getCustomerById)          //v
router.delete('/admin/customers/:id', adminctrl.removeCustomer)        // constrain FK
router.get('/admin/users', adminctrl.getAllUsers)                      //v
router.get('/admin/users/:id', adminctrl.getUserById)                  //v
router.get('/admin/flights/', anoctrl.getAllFlights)


module.exports = router

