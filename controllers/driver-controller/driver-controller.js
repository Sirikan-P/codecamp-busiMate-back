const prisma = require("../../configs/prisma")
const createError = require("../../utils/createError")

//file - pics
const cloudinary = require('../../configs/cloudinary')
const fs = require('fs/promises')
const path = require('path')

//get me ----------------------------------------
exports.currentDriver = async (req, res, next) => {
    try {
        //console.log( req.user)
        const { email, id } = req.user

        const profile = await prisma.driver.findFirst({
            where: { email: email, id: id },
            include: { DriverAddress: { orderBy: {
                status: 'desc' 
            }} }
        })

        const { password: pw, ...newProfile } = profile;

        res.json({
            success: true,
            message: `hello, driver : ${email}`,
            result: newProfile
        })
    } catch (error) {
        next(error)
    }
}

//update profile ----------------------------------------
exports.updateProfile = async (req, res, next) => {
    try {
        const { email, id } = req.user
        const newData = req.body

        const driverData = await prisma.driver.findFirst({
            where: { email: email, id: id },
            include: { DriverAddress: true } // ดึงข้อมูลที่อยู่มาด้วย
        })

        if (!driverData) {
            return next(createError(400, 'Driver not found'))
        }

        // แปลงค่าที่จำเป็นให้เป็นตัวเลข
        if (newData.age) newData.age = Number(newData.age)
        if (newData.lat) newData.lat = parseFloat(newData.lat)
        if (newData.long) newData.long = parseFloat(newData.long)


        //-------------------------------------------------
        const haveFile = !!req.file
        let uploadResult = {}
        if (haveFile) {
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                overwrite: true,
                folder: 'busiMateDriver',
                public_id: path.parse(req.file.path).name
            })

            fs.unlink(req.file.path)
        }
        const driverUpdateData = haveFile
            ? { ...newData, profileImageUrl: uploadResult.secure_url }
            : newData
        // เตรียมอัปเดตข้อมูล driver        
        delete driverUpdateData.password
        delete driverUpdateData.address; // เอา address ออกจาก newData 
        delete driverUpdateData.lat;
        delete driverUpdateData.long;


        // อัปเดตข้อมูล driver
        const updatedDriver = await prisma.driver.update({
            where: { id: Number(id) },
            data: driverUpdateData,
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
//add address  ----------------------------------------
exports.addDriverAddress = async (req, res, next) => {
    try {
        //console.log( req.user)
        const { email, id } = req.user
        const newData = req.body

        const address = await prisma.driverAddress.findFirst({
            where: {
                driverId: Number(id),
                lat: Number(newData.lat),
                long: Number(newData.long)
            }
        })

        if (address) {
            return next(createError(400, 'Address Already add'))
        }

        const newAddress = await prisma.driverAddress.create({
            data: {
                driverId: Number(id),
                address: newData.address,
                lat: Number(newData.lat),
                long: Number(newData.long),
                status: "NOTUSE"
            }
        })

        res.json({
            success: true,
            message: "Add address success",
            result: newAddress
        })
    } catch (error) {
        next(error)
    }
}
//update address  --------------------------------
exports.updateDriverAddress = async (req, res, next) => {
    try {
        //console.log( req.user)
        const { email, id } = req.user
        const newData = req.body

        const address = await prisma.driverAddress.findFirst({
            where: {
                driverId: Number(id),
                id: Number(newData.id)
            }
        })

        if (!address) {
            return next(createError(401, 'No address data'))
        }
        console.log(newData)
        let newAddress 
        //-------------------------------------------------
        if(newData.status == "USE"){
            //set other to NOTUSE
            await prisma.driverAddress.updateMany({
                where: { driverId: Number(id), status: "USE"  },
                data: { 
                    status: "NOTUSE"                     
                }
            })
              //set use
            newAddress = await prisma.driverAddress.update({
                where: {
                    id: address.id
                },
                data: {status: "USE" }
            })
        }

        const driverAddress =  await prisma.driverAddress.findMany({
            where: { driverId: Number(id) }
        });
        
        res.json({
            success: true,
            message: "Add address success",
            result: driverAddress
        })
    } catch (error) {
        next(error)
    }
}
//delete address  ----------------------------------------
exports.deleteDriverAddress = async (req, res, next) => {
    try {
        const { email, id } = req.user;
        const data = req.params // รับค่า ID ของที่อยู่จาก params

        console.log('deleteAddress',data)
        // ตรวจสอบว่ามีที่อยู่ที่ต้องการลบหรือไม่
        const address = await prisma.driverAddress.findUnique({
            where: { id: Number(data.id), driverId: Number(id) }
        });

        if (!address) {
            return next(createError(404, 'Address not found'));
        }
        // ตรวจสอบว่ามีที่อยู่ที่ใช้อยู่หรือไม่
        const driverUse = await prisma.driverAddress.findFirst({
            where: { id: Number(data.id), driverId: Number(id), status: "USE" }
        })
        if (driverUse) {
            return next(createError(404, 'Cannot delete current Address'));
        }

        // ลบที่อยู่
        await prisma.driverAddress.delete({
            where: { id: Number(data.id) }
        });

        const driverAddress =  await prisma.driverAddress.findMany({
            where: { driverId: Number(id) }
        });

        res.json({
            success: true,
            message: "Delete address success",
            result: driverAddress
        });

    } catch (error) {
        next(error);
    }
};