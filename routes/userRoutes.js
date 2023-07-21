
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router
    .route('/')

    .post(userController.createUsers)
    .get(userController.findAllUsers)

router
    .route('/:id')
    //     .get(userController.findUserByPk)
    .put(userController.updateUser)
//     .delete(userController.deleteUser)


module.exports = router



