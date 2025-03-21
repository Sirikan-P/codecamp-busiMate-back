const prisma = require("../configs/prisma")
const createError = require('../utils/createError');

const stripe = require('stripe')('sk_test_51R4xmxBBt2acnoHhH6yP6Dl5oCmifTUhXudU8GhHZdtn5oQN9wOVLcpWKV0LBrsmcGAyocAUecOEjN0f141vjNer009a5tSikW')

exports.checkOut = async (req, res, next) => {
  try {

    //bookingid 
    const { id } = req.body;
    
    const booking = await prisma.booking.findFirst({
      where: { id: parseInt(id) } 
    });
    
    //stripe --
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { bookingId: parseInt(id) },
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          quantity: 1,
          price_data: {
            currency: "thb",
            product_data: {
              name: "booking"
            },
            unit_amount: parseInt(booking.totalPrice)*100 ,
          }
        },
      ],
      mode: 'payment',
      return_url: `http://localhost:5173/user/complete/{CHECKOUT_SESSION_ID}`, //** wait for front-ent */
    });

     console.log('ss',session)
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    next(error)
  }
}



exports.checkOutStatus = async (req, res, next) => {
  try {
    const { session_id } = req.params
    //stripe --
    const session = await stripe.checkout.sessions.retrieve(session_id)
    const bookingId = session.metadata?.bookingId

    if (session.status !== "complete") {
      return createError(400, "Something wrong")
    }

    // console.log(session) 
    console.log("bookingId",bookingId) 

    // update order status-----------------------
    const result = await prisma.booking.update({
      where: { id: Number(bookingId) },
      data: {
        paymentStatus: "COMPLETE",
        bookingStatus: "UP_COMING"
      }
    })

    //update product order qty = order prduct qty 

    res.json({ message: "payment complete" })
  } catch (error) {
    next(error)
  }
}