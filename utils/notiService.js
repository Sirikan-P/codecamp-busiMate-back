const prisma = require("../configs/prisma")

const notiService = (io) => {

  return io.on('connection', (socket) => {

    //create socket for noti -------------------
    socket.on('send_noti', (booking) => {
     
      io.emit("U"+booking.driverId, booking )   // ("event name: driver ID" , "data" )
    })

    socket.on('driver_noti',async  (data) => {      
      //if reject = set database booking status = FIND_DRIVER---------------
      //if accept = set database booking status = UP_COMING----------------
      const bookingStatus =  (data.result=='ACCEPT') ? "UP_COMING": "FIND_DRIVER"

     
      // //อัปเดตสถานะ ---------------
       await prisma.booking.update({
        where: { id: +data.id },
        data: {
          bookingStatus : bookingStatus ,
          driverId : +data.driverId ,          
        }
      });

      io.emit(data.id, data.result)   // ("event name:Booking Id" , "data" )
    })

  });
}

module.exports = notiService