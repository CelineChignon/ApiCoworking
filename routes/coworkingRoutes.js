const express = require(`express`)
const router = express.Router()

const coworkingController = require('../controllers/coworkingController')

router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(coworkingController.findAllCoworkingByPK)

router
    .route('/:id')
    .get(coworkingController.createCoworking)

    .put(coworkingController.updateCoworking)
    .delete(coworkingController.deleteCoworking)
module.exports = router