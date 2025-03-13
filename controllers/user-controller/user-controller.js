const prisma = require("../../configs/prisma")

exports.showUser = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
            },
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

        res.status(201).json(newPatient); 
    } catch (error) {
        console.error("Error adding patient:", error);
        res.status(500).json({ message: "Failed to add patient." });
    }
};
exports.editPatients = (req, res, next) => {
    try {
        res.json({ msg: "Update patients" })
    } catch (error) {
        next(error)
    }
}
exports.deletePatients = async (req, res, next) => {
    try {
        const { id } = req.params
        const deleted = await prisma.patient.delete({
            where: {
                id: Number(id)
            }
        })
        res.json({ msg: "Delete patients" })
    } catch (error) {
        next(error)
    }
}