const coworkings = require('../db/mock-coworkings');
const mockCoworkings = require('../db/mock-coworkings')
const { CoworkingModel } = require('../db/sequelize')


exports.findAllCoworkings = (req, res) => {
    // const criterium = req.query.criterium ? req.query.criterium : 'superficy'
    // const orderBy = req.query.orderBy || 'ASC'

    // console.log('exemple : ', criterium, orderBy)

    // const arrToSort = [...mockCoworkings];
    // const nosort = req.query.nosort

    // if (!nosort && (orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {

    //     arrToSort.sort((a, b) => {
    //         return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
    //     })
    // }

    // res.json(arrToSort)

    CoworkingModel
        .findAll({

        })
        .then((result) => {
            res.json({ message: `La liste des coworkings a bien été récuperée`, data: result })
        })
        .catch((error) => {
            res.json({ message: `Une erreur est survenue :${error}` })
        })


}

exports.createCoworking = (req, res) => {
    const newCoworking = req.body
    CoworkingModel
        .create({
            name: newCoworking.name,
            price: newCoworking.price,
            adress: newCoworking.address,
            superficy: newCoworking.superficy,
            capacity: newCoworking.capacity,
        })
        .then((result) => {
            res.json
                ({ message: `Un nouveau coworking n°${result.id} a été créé.`, data: result })
        })
        .catch((error) => {
            res.json({ message: `Une erreur est survenue :${error}` })
        })
}

exports.findCoworkingByPk = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)

        .then((result) => {
            if (!result) {
                res.json({ message: `L'élément ayant pour id ${req.params.id} n'existe pas` })
            } else {
                res.json({ message: `Le coworkings ${result.id} a bien été récuperée`, data: result })
            }

        })
        .catch((error) => {
            res.json({ message: `Une erreur est survenue :${error}` })
        })

    // let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))
    // if (targetCoworking) {
    //     return res.json({ message: `L'élément ayant pour id : ${targetCoworking.id} a bien été récupéré`, data: targetCoworking })
    // } else {

    //     return res.json({ message: `L'élément ayant pour id ${req.params.id} n'a pas pu être récupéré.` })
    // }

}

exports.updateCoworking = (req, res) => {

    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                return res.json({ message: `Aucun coworking trouvé` })
            } else {
                result
                    .update(req.body)
                    .then(() => {
                        res.json({ message: `Le coworking ${result.dataValues.id} a été modifié.`, data: result })
                    })
            }
        }).catch((error) => {
            res.json({ message: `L'élément n'a pas pas été modifié Une erreur est survenue :${error}` })
        })


    // const indexInArray = mockCoworkings.findIndex((element) => {
    //     return element.id === parseInt(req.params.id)
    // })
    // if (indexInArray === -1) {
    //     return res.json({ message: `L'id ${req.params.id} n'a pas pu être modifié car il ne correspond à aucun élément.` })
    // } else {
    //     let updatedCoworking = { ...mockCoworkings[indexInArray], ...req.body }
    //     mockCoworkings[indexInArray] = updatedCoworking;

    //     return res.json({ message: `Le coworking ${updatedCoworking.name} a été modifié`, data: updatedCoworking })
    // }


}

exports.deleteCoworking = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                return res.json({ message: `Aucun coworking trouvé` })
            } else {
                result
                    .destroy()
                    .then(() => {
                        res.json({ message: `Le coworking ${result.dataValues.id} a été supprimé.`, data: result })
                    })
            }
        }).catch((error) => {
            res.json({ message: `L'élément n'a pas pu être supprimé :${error}` })
        })

    // CoworkingModel
    //     .destroy
    //     ({
    //         where: {
    //             id: req.params.id
    //         }
    //     })

    //     .then((result) => {
    //         if (req.params.id === 0) {
    //             res.json
    //                 ({ message: `Le coworking ${req.params.id} n'existe pas donc ne peut etre supprimé.`, data: result })
    //         } else {
    //             res.json
    //                 ({ message: `Le coworking ${req.params.id} a été supprimé.`, data: result })
    //         }
    //     })
    // .catch((error) => {
    //     res.json({ message: `L'élément n'a pas pu être supprimé :${error}` })
    // })

    // const indexInArray = mockCoworkings.findIndex((element) => {
    //     return element.id === parseInt(req.params.id)
    // })

    // if (indexInArray === -1) {
    //     return res.json({ message: `L'id ${req.params.id} ne correspond à aucun élément.` })
    // } else {
    //     const deleteCoworkings = mockCoworkings.splice(indexInArray, 1)
    //     return res.json({ message: `L'élément id ${req.params.id} a bien été supprimé,`, data: deleteCoworkings[0] })
    // }


}