const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const anonRoutes = require('./router/anon-router');
const adminRoutes = require('./router/admin-router')
const airlineRoutes = require('./router/airline-router')
const customerRoutes = require('./router/customer-router');
const AuthRouters = require('./router/auth-router')


const app = express();

//atlas connection
// const mongoose = require('mongoose');
// const dbURI = 'mongodb+srv://admin:<password>@cluster0.dkygx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}))

//test
// const CheckCookie = (req, res, next) => {
//   const { cookies } = req
//   if ( 'sessoin' in cookies) {
//     console.log(cookies, 'cookie exist')
//     next();
//   } else {
//     res.status(403).json('Unauthorized user')
//     console.log('Unauthorized user')

//   }
// }

//test
// app.get('/home', CheckCookie, (req, res) => {
//   res.cookie('sessoin', '1234')
//   res.status(200).json('cookie made')
// })

//test
// app.get('/protected', CheckCookie, (req, res) => {
//   res.status(200).json('authorized !')
// })

app.use(anonRoutes);
app.use(adminRoutes);
app.use(airlineRoutes)
app.use(customerRoutes);
app.use(AuthRouters);


app.listen(8080, console.log('server on port 8080'));