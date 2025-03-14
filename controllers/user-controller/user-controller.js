const prisma = require("../../configs/prisma")

exports.showUser = async (req, res, next) => {
    try {
        const users = await prisma.user.findFirst({
            where: {
                role: "user",
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
        const { id, firstName, lastName, phoneNumber } = req.body;
        console.log(req.body);

        if (!id) {
            return res.status(400).json({ error: "จำเป็นต้องระบุ ID ผู้ใช้" });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
            },
        });
        res.json({ msg: "อัปเดตผู้ใช้สำเร็จ", updatedUser });
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
        const { id, firstName, lastName, phoneNumber, age, gender, healthCondition } = req.body
        const patient = await prisma.patient.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        const parsedAge = parseInt(age);
        if (isNaN(parsedAge)) {
            return res.status(400).json({ error: "Age must be a valid number" });
        }
        const updatedPatient = await prisma.patient.update({
            where: {
                id: Number(id)
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                age: parsedAge,
                gender: gender,
                healthCondition: healthCondition
            }
        })
        res.json({ msg: "update patients", updatedPatient })
    } catch (error) {
        next(error)
    }
}
