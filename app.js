const mockCoworkings = require('./db/mock-coworkings')
const express = require('express')
const morgan = require('morgan')
const sequelize =require('./db/sequelize')
const app = express()
const port = 3000

sequelize.initDb()
//middleware
//app.use(express.json()) pour renvoyer tout en json
app.use(express.json())
app.use(morgan('dev'))

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoutes')

app.use('/api/coworkings', coworkingRouter)
app.use('/api/users', userRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})








// -----------GET---------------

//app.get('/api/coworkings/:id', )

// app.get('/api/coworkings', )

// -----------POST---------------

//app.post('/api/coworkings', )


// -----------PUT---------------
//Modification des elements  d'un coworking
//app.put('/api/coworkings/:id', )

// -----------DELETE---------------

//app.delete('/api/coworkings/:id', )

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
//app.get('/api/coworkings/:id', (req, res) => {
    // Afficher le nom du coworking qui correspond a l'id en parametre 
    // let targetCoworking;
    // for (let i = 0; i < mockCoworkings.length; i++) {
    //     const element = mockCoworkings[i];
    //     if (element.id === parseInt(req.params.id)) {
    //         targetCoworking = element
    //         break;
    //     }
    // }
//})