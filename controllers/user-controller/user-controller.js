const prisma = require("../../configs/prisma")

exports.showUser = async (req, res, next) => {

    try {
        const { email } = req.user
        const users = await prisma.user.findFirst({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
            }
        })
        console.log(users)
        res.json({ msg: "Show user" })
    } catch (error) {
        next(error)
    }
}
exports.editUser = (req, res, next) => {
    try {
        res.json({ msg: "Update user" })
    } catch (error) {
        next(error)
    }
}
exports.addPatients = (req, res, next) => {
    try {
        const{firstName, lastName, age, gender} = req.body
        res.json({ msg: "Add patients" })
    } catch (error) {
        next(error)
    }
}
exports.editPatients = (req, res, next) => {
    try {
        res.json({ msg: "Update patients" })
    } catch (error) {
        next(error)
    }
}
exports.deletePatients = async(req, res, next) => {
    try {
        const { id } = req.params
        const deleted = await prisma.patient.delete({
            where:{
                id:Number(id)
            }
        })
        res.json({ msg: "Delete patients" })
    } catch (error) {
        next(error)
    }
}