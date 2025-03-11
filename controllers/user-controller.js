exports.showUser = (req,res,next) => {
    try {
        res.json({msg:"Show user"})
    } catch (error) {
        next(error)
    }
}
exports.editUser = (req,res,next) => {
    try {
        res.json({msg:"Update user"})
    } catch (error) {
        next(error)
    }
}
exports.addPatients = (req,res,next) => {
    try {
        res.json({msg:"Add patients"})
    } catch (error) {
        next(error)
    }
}
exports.editPatients = (req,res,next) => {
    try {
        res.json({msg:"Update patients"})
    } catch (error) {
        next(error)
    }
}
exports.deletePatients = (req,res,next) => {
    try {
        res.json({msg:"Delete patients"})
    } catch (error) {
        next(error)
    }
}