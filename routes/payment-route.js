const express = require("express")
const router = express.Router()

//import controller
const payment = require("../controllers/payment-controller")

//import middleware
const { authCheck } = require("../middlewares/authCheck")


//@ENDPOINT http://localhost:8001/api/user/payment/checkout
router.post('/payment/checkout' ,payment.checkOut )  
router.get('/payment/checkout-status/:session_id', authCheck ,payment.checkOutStatus )  

 


//export
module.exports = router