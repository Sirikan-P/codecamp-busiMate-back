const prisma = require("../../configs/prisma")
const createError = require("../../utils/createError")

//file - pics
const cloudinary = require('../../configs/cloudinary')
const fs = require('fs/promises')
const path = require('path')

//get me ----------------------------------------
exports.currentDriver= async (req,res,next)=>{
  try {
    //console.log( req.user)
    const { email ,id } = req.user

    const profile = await prisma.driver.findFirst({
        where: {email: email , id:id },
        include: { DriverAddress: true } 
    })

    const { password: pw, ...newProfile } = profile;

    res.json({  success: true ,
                message: `hello, driver : ${ email }` ,
                result: newProfile  })
  } catch (error) {
      next(error)
  }
}

//update profile ----------------------------------------
exports.updateProfile= async(req,res,next)=>{
    try {
        const { email , id } = req.user
        const newData = req.body

        console.log(1111,req.user )
        const driverData = await prisma.driver.findFirst({
            where: { email: email ,id: id},
            include: { DriverAddress: true } // ดึงข้อมูลที่อยู่มาด้วย
        })
 
        if (!driverData) {
            return next(createError(400, 'Driver not found'))
        }
        const { password: pw, ...newProfile } = profile;
          // แปลงค่าที่จำเป็นให้เป็นตัวเลข
         if (newData.age) newData.age = Number(newData.age)
        if (newData.lat) newData.lat = parseFloat(newData.lat)
        if (newData.long) newData.long = parseFloat(newData.long)

            // เตรียมอัปเดตข้อมูล driver
        const driverUpdateData = { ...newData };
        delete driverUpdateData.password
        delete driverUpdateData.address; // เอา address ออกจาก newData เพราะ Prisma คาดหวังอ็อบเจ็กต์ ไม่ใช่ string
        delete driverUpdateData.lat;
        delete driverUpdateData.long;
        //-------------------------------------------------
        //const haveFile = !!req.file
        // let uploadResult = {}
        // if (haveFile) {
        //     uploadResult = await cloudinary.uploader.upload(req.file.path, {
        //         overwrite: true,
        //         folder: 'busiMateDriver',
        //         public_id: path.parse(req.file.path).name 
        //     })
        //     fs.unlink(req.file.path)
        // }
        // const data = haveFile 
        //             ?  {...newData , profileImage : uploadResult.secure_url }
        //             :  newData
        // console.log(data)
        console.log(222,driverUpdateData)

        if (newData.address || newData.lat || newData.long) {
            const address = await prisma.driverAddress.findFirst({
                where : {driverId: Number(id) ,
                    lat: Number(newData.lat),
                    long: Number(newData.long)
                }
            })
       /// console.log(address)
        if(address) {

            //set other to NOTUSE
            await prisma.driverAddress.update({
                where: { driverId: Number(id) , status: "USE"} , 
                data:  { status: "NOTUSE" }          
                })

            //set use
            await prisma.driverAddress.update({
                where: { id: address.id 
                } , 
                data:  {address: newData.address,
                    lat: Number(newData.lat),
                    long: Number(newData.long)},
                    status: "USE"
            })

        }   else {

            await prisma.driverAddress.create({
                data: {
                    driverId: Number(id),
                    address: newData.address,
                    lat: Number(newData.lat),
                    long: Number(newData.long),
                    status: "USE"

                }
            })             
        } 
        }
        // อัปเดตข้อมูล driver
        const updatedDriver = await prisma.driver.update({
            where: { id: Number(id) },
            data: driverUpdateData ,
            include: { DriverAddress: true }
        })
        res.json({
            success: true,
            message: "Update success",
            result: updatedDriver
        })

    } catch (error) {
        next(error)
    }
}
//delete driver profile ----------------------------------------
