const { Sequelize, DataTypes } = require('sequelize');
const mockCorworkings = require('./mock-coworkings')
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('coworking', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log(`La connexion à la base de données a bien été établie.`))
    .catch(error => console.log(`Impossible de se connecter à la base de données${error}`)
    )

const defineCoworkingModel = require('../models/coworkingModelDefinition')
const CoworkingModel = defineCoworkingModel(sequelize, DataTypes)

const defineUserModel = require('../models/userModelDefinition')
const UserModel = defineUserModel(sequelize, DataTypes)

const initDb = () => {
    sequelize.sync({ force: true })
        .then(() => {
            mockCorworkings.forEach(element => {
                CoworkingModel.create({
                    name: element.name,
                    price: element.price,
                    adress: element.address,
                    superficy: element.superficy,
                    capacity: element.capacity,
                });
            });
            bcrypt.hash(`mdp`, 10)
                .then(hash => {
                    UserModel.create({
                        username: 'Jean ',
                        password: hash
                    })
                })

        })
}
module.exports = {
    initDb, CoworkingModel, UserModel
}