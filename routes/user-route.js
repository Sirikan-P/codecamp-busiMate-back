const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller/user-controller')    


router.get('/me',userController.showUser)
router.patch('/me/edit',userController.editUser)
router.post('/patient/add',userController.addPatients)
router.patch('/patient/edit',userController.editPatients)
router.delete('/patient/:id',userController.deletePatients)

module.exports = router


