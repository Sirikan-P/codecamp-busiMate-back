
const notiService = (io) => {
  return  io.on('connection', (socket) => {
    console.log('a user connected');
    //create socket for noti 
    socket.on('send_noti',(driver)=>{
      //console.log(driver)
      io.emit(driver.id, driver.id)   // ("event name" , "data" )
    })   
  });
}

module.exports = notiService