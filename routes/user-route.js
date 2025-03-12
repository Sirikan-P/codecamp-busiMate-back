const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller/user-controller')

router.get('/api/user/me',userController.showUser)
router.patch('/api/user/me/edit',userController.editUser)
router.post('/api/user/patient/add',userController.addPatients)
router.patch('/api/user/patient/edit',userController.editPatients)
router.delete('/api/user/patient/:id',userController.deletePatients)

module.exports = router