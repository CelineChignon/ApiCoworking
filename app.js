const mockCoworkings = require('./mock-coworkings')
const express = require('express')
const app = express()
const port = 3000
// rah=jout de paramettre si 
app.use(express.json())

// -----------GET---------------

app.get('/api/coworkings/:id', (req, res) => {
    // Afficher le nom du coworking qui correspond a l'id en parametre 
    // let targetCoworking;
    // for (let i = 0; i < mockCoworkings.length; i++) {
    //     const element = mockCoworkings[i];
    //     if (element.id === parseInt(req.params.id)) {
    //         targetCoworking = element
    //         break;
    //     }
    // }

    let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))
    if (targetCoworking) {
        return res.json({ message: `L'élément ayant pour id : ${targetCoworking.id} a bien été récupéré`, data: targetCoworking })
    } else {

        return res.json({ message: `L'élément ayant pour id ${req.params.id} n'a pas pu être récupéré.` })
    }

})

// let myIdentity = [2, 3]

// let nb1 = 3
// let nb2 = nb1
// nb2 += 4

// let myIdentity2 = [...myIdentity];
// myIdentity2.push(4)

// console.log(myIdentity2, myIdentity)

app.get('/api/coworkings', (req, res) => {
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
})

// -----------POST---------------

app.post('/api/coworkings', (req, res) => {

    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    const newCoworking = { id: newId, ...req.body }
    mockCoworkings.push(newCoworking)
    console.log(req.body);
    return res.json({ message: `Un nouveau coworking n° ${newCoworking.id} a été crée.`, data: newCoworking })
})



// -----------PUT---------------
//Modification des elements  d'un coworking
app.put('/api/coworkings/:id', (req, res) => {

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


})


// -----------DELETE---------------

app.delete('/api/coworkings/:id', (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)
    })

    if (indexInArray === -1) {
        return res.json({ message: `L'id ${req.params.id} ne correspond à aucun élément.` })
    } else {
        const deleteCoworkings = mockCoworkings.splice(indexInArray, 1)
        return res.json({ message: `L'élément id ${req.params.id} a bien été supprimé,`, data: deleteCoworkings[0] })
    }


})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
//http://localhost:3000/api/coworkings?criterium=capacity&orderBy=DESC

//creer un nouveau endpoint pour afficher le tableau entier en json
// app.get('/api/coworkings', (req, res) => {
//     res.json(mockCorworkings)
// })


//Afficher le nom du coworking qui correspond a l'id en parametre
// sur le chemin d'un navigateur inscrir http://localhost:3000/id
// let targetCoworking

// for (let index = 0; index < mockCorworkings.length; index++) {
//     const element = mockCorworkings[index];
//     if (element.id === parseInt(req.params.id)) {
//         targetCoworking = element
//         break;
//     }

// }
// res.send(`Nom du coworking : ${targetCoworking.name}`)
// })

// let targetCoworking = mockCorworkings.find(el => el.id === parseInt(req.params.id))

// res.json({ result: `Nom du coworking : ${targetCoworking ? targetCoworking.name : `inconnu`}` })