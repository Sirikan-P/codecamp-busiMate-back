const express = require("express")
const router = express.Router()

//import controller
const payment = require("../controllers/payment-controller")




//@ENDPOINT http://localhost:8001/api/user/payment/checkout
router.post('/payment/checkout', authCheck ,payment.checkOut )  
router.get('/payment/checkout-status/:session_id', authCheck ,payment.checkOutStatus )  

 


//export
module.exports = router