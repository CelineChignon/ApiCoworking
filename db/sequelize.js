const { Sequelize, DataTypes } = require('sequelize');
const mockCorworkings = require('./mock-coworkings')


const sequelize = new Sequelize('coworking', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log(`La connexion à la base de données a bien été établie.`))
    .catch(error => console.log(`Impossible de se connecter à la base de données${error}`)
    )

const getCoworkingModels = require('../models/coworkingModels')
const CoworkingModel = getCoworkingModels(sequelize, DataTypes)

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
        })

}
module.exports = {
    initDb
}