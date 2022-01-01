
const { Router } = require('express')
const Authctrl = require('../ctrls/auth-ctrl')

const router = Router()

router.post('/ano/login/', Authctrl.AuthUserAndPass)

module.exports =  router