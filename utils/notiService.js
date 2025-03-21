const prisma = require("../configs/prisma")

const notiService = (io) => {
  //console.log('socket')
  return io.on('connection', (socket) => {
    console.log('a user connected');
    //create socket for noti 
    socket.on('send_noti', (booking) => {
      console.log(booking.driverId)      
      io.emit("U"+booking.driverId, booking )   // ("event name" , "data" )
    })

    socket.on('driver_noti',async  (data) => {
      console.log(data)
      //if reject = set database booking status = FIND_DRIVER
      //if accept = set database booking status = UP_COMING
      const bookingStatus =  (data.result=='ACCEPT') ? "UP_COMING": "FIND_DRIVER"
          // อัปเดตสถานะ 
       await prisma.booking.update({
        where: { id: +data.bookingId },
        data: {
          bookingStatus : bookingStatus ,
          driverId : +data.driverId ,          
        }
      });

      io.emit(data.bookingId, data.result)   // ("event name" , "data" )
    })

  });
}

module.exports = notiService