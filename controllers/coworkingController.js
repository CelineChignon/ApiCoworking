const mockCoworkings = require('../db/mock-coworkings')

exports.findAllCoworkings = (req, res) => {
    const criterium = req.query.criterium ? req.query.criterium : 'superficy'
    const orderBy = req.query.orderBy || 'ASC'

    console.log('exemple : ', criterium, orderBy)

    const arrToSort = [...mockCoworkings];
    const nosort = req.query.nosort
    if (!nosort && (orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {

        arrToSort.sort((a, b) => {
            return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
        })
    }

    res.json(arrToSort)

}

exports.findAllCoworkingByPK = (req, res) => {

    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    const newCoworking = { id: newId, ...req.body }
    mockCoworkings.push(newCoworking)
    return res.json({ message: `Un nouveau coworking n°${newCoworking.id} a été créé.`, data: newCoworking })
}

exports.createCoworking = (req, res) => {


    let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))
    if (targetCoworking) {
        return res.json({ message: `L'élément ayant pour id : ${targetCoworking.id} a bien été récupéré`, data: targetCoworking })
    } else {

        return res.json({ message: `L'élément ayant pour id ${req.params.id} n'a pas pu être récupéré.` })
    }

}

exports.updateCoworking = (req, res) => {

    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)
    })
    if (indexInArray === -1) {
        return res.json({ message: `L'id ${req.params.id} n'a pas pu être modifié car il ne correspond à aucun élément.` })
    } else {
        let updatedCoworking = { ...mockCoworkings[indexInArray], ...req.body }
        mockCoworkings[indexInArray] = updatedCoworking;

        return res.json({ message: `Le coworking ${updatedCoworking.name} a été modifié`, data: updatedCoworking })
    }


}

exports.deleteCoworking = (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)
    })

    if (indexInArray === -1) {
        return res.json({ message: `L'id ${req.params.id} ne correspond à aucun élément.` })
    } else {
        const deleteCoworkings = mockCoworkings.splice(indexInArray, 1)
        return res.json({ message: `L'élément id ${req.params.id} a bien été supprimé,`, data: deleteCoworkings[0] })
    }


}