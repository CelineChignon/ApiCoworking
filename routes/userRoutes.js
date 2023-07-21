
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require(`../controllers/authController`)

router
    .route('/')
    .get(userController.findAllUsers)

router
    .route(`/signUp`)
    .post(authController.signUp)

router
    .route(`/login`)
    .post(authController.login)

router
    .route('/:id')
    .get(userController.findUserByPk)
    .put(authController.protect, userController.updateUser)
    .delete(authController.protect, userController.deleteUser)


module.exports = router



