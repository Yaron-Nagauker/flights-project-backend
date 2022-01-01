


const flight_bl = require('../flight-service-bl');


const getAllUsers = async(req, res) => {
    try{
        users = await flight_bl.getAllUsers()
        await res.status(200).json( users )
    }
    catch(e) {
        
        res.status(400).json({
            status:'fail',
            message: e.message
        })
    }
}

const addCustomer = async (req, res) => {
    try{
        customer = req.body
        const result = await flight_bl.addCustomer(customer)
        res.status(200).json({
        res:'sucsess',
        url:'localhost/8080/products/' + customer.id,
        result
        })
    }
    catch(e) {
        req.status(400).json({
            status:"fail",
            message:e.message
        })
    }
}

const AuthUserAndPass = async (req,res) => {
    try{
        mail = req.body.mail
        pass = req.body.pass
        // console.log(user, pass)
        const result = await flight_bl.CheckUsername(mail, pass)
        console.log(result)
        if (result.length === 0) {
            res.status(404).json('no user found')
        } else {
            
            res.status(200).json({
                res:'sucsess',
                result
            })
        }
    }
    catch(e) {
        res.status(401).json({
            status:"fail",
            message:e.message
        })
    }
}


module.exports = {
    getAllUsers,
    addCustomer,
    AuthUserAndPass
}