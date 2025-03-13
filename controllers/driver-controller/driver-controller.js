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
    console.log("xx",req.user)
    const { email } = req.user

    const profile = await prisma.driver.findFirst({
        where: {email: email ,
        }
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
        const { email } = req.user
        const newData = req.body

        const driverData = await prisma.driver.findUnique({
            where: { email: email },
            include: { DriverAddress: true } // ดึงข้อมูลที่อยู่มาด้วย
        })
 
        if (!driverData) {
            return next(createError(400, 'Driver not found'))
        }

        const id = driverData.id
          // แปลงค่าที่จำเป็นให้เป็นตัวเลข
         if (newData.age) newData.age = Number(newData.age)
        if (newData.lat) newData.lat = parseFloat(newData.lat)
        if (newData.long) newData.long = parseFloat(newData.long)

            // เตรียมอัปเดตข้อมูล driver
        const driverUpdateData = { ...newData };
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
        console.log(driverData)
        if (newData.address || newData.lat || newData.long) {
            const address = await prisma.driverAddress.findFirst({
                where : {driverId: Number(id) ,
                    lat: Number(newData.lat),
                    long: Number(newData.long)
                }
            })
       /// console.log(address)
        if(address) {
            console.log(1)
            await prisma.driverAddress.update({
                where: { id: address.id 
                } , 
                data:  {address: newData.address,
                    lat: Number(newData.lat),
                    long: Number(newData.long)}
            })
        }   else {
            console.log(2)
            await prisma.driverAddress.create({
                data: {
                    driverId: Number(id),
                    address: newData.address,
                    lat: Number(newData.lat),
                    long: Number(newData.long),
                    status: "NEW"

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
