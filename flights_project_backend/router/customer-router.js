const { Router } = require('express')
const customerctrl = require('../ctrls/customer-crtl')
const anoctrl = require('../ctrls/ano-ctrl')

const router = Router();



router.get('/coustomer/:id', customerctrl.addTickets)



module.exports = router