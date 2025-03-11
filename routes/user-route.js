const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

router.get('/api/user/me/:id',userController.showUser)
router.patch('/api/user/me/:id',userController.editUser)
router.post('/api/user/patient',userController.addPatients)
router.patch('/api/user/patient/:id',userController.editPatients)
router.delete('/api/user/patient/:id',userController.deletePatients)

module.exports = router