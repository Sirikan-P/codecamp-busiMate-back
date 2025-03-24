const prisma = require("../../configs/prisma")
const cloudinary = require('../../configs/cloudinary')
const path = require('path')
const fs = require('fs/promises')

exports.showUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const users = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
                firstName: true,    
                lastName: true,
                phoneNumber: true,
                role: true,
            }

        });
        console.log(users);
        res.json({ msg: "Show users", users });
    } catch (error) {
        next(error);
    }
};
exports.editUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {  firstName, lastName, phoneNumber, email, address } = req.body;
        console.log(req.body);


        const updatedUser = await prisma.user.update({
            where: {id: userId },
            data: {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                address: address,
            },
        });
        res.json({ msg: "อัปเดตผู้ใช้สำเร็จ", updatedUser });
    } catch (error) {

        next(error);
    }
};

exports.getPatients = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const patients = await prisma.patient.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                age: true,
                gender: true,
                healthCondition: true,
            }
        });
        res.json({ msg: "Show patients", patients });
    } catch (error) {
        next(error);
    }
};
exports.getByPatientId = async (req, res, next) => {
    try {
        const patientId = req.params.id;
        console.log("patientId:", patientId);
        const patient = await prisma.patient.findUnique({
            where: {
                id: +patientId,
            },
            select: {
                firstName: true,
                lastName: true,
                phoneNumber: true,
                age: true,
                healthCondition: true,
            }
            
        });
        res.json(patient);
    } catch (error) {
        next(error);
    }
};



exports.addPatients = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, phoneNumber, age, gender, healthCondition } = req.body;
        const users = await prisma.user.findUnique({
            where: {
                id: +userId,
            },
        });
        if (!users) {
            return res.status(404).json({ error: "User not found" });
        }
        const parsedAge = parseInt(age);

        if (isNaN(parsedAge)) {
            return res.status(400).json({ error: "Age must be a valid number" });
        }
        const newPatient = await prisma.patient.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                age: parsedAge,
                gender: gender,
                healthCondition: healthCondition,
                userId: +userId,
            }
        })
        console.log(newPatient);
        res.status(201).json(newPatient);
    } catch (error) {
        console.error("Error adding patient:", error);
        res.status(500).json({ message: "Failed to add patient." });
    }
};
exports.editPatients = async (req, res, next) => {
    try {
        const { firstName, lastName, phoneNumber, age, healthCondition } = req.body
        const { id } = req.params;
        const patient = await prisma.patient.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        const updatedPatient = await prisma.patient.update({
            where: {
                id: Number(id)
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                age: Number(age),
                healthCondition: healthCondition
            }
        })
        res.json({ msg: "update patients", updatedPatient })
    } catch (error) {
        next(error)
    }
}
exports.editProfileImage = async (req, res, next) => {
    try {
console.log(req.file);

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
  console.log(uploadResult);



        const userId = req.user.id;
       
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                profileImage: uploadResult.url,
            },
        });
        res.json({ msg: "อัปเดตผู้ใช้สำเร็จ", updatedUser });
    } catch (error) {
        next(error);
    }
};

