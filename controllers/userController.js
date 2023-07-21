const { UniqueConstraintError, ValidationError } = require('sequelize')
const { UserModel } = require('../db/sequelize')

exports.findAllUsers = (req, res) => {
    UserModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des utilisateurs a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

exports.createUsers = (req, res) => {
    const newUser = req.body
    UserModel
        .create({
            username: newUser.username,
            password: newUser.password,

        })
        .then((result) => {
            res.status(201).json
                ({ message: `L utilisateur${result.id} a été créé.`, data: result })
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(404).json({ message: error.message })
            }
            res.status(500).json({ message: `Une erreur est survenue :${error}` })
        })
}

exports.updateUser = (req, res) => {

    UserModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: `Aucun utilisateur n'a été trouvé avec l'id :${req.params.id}` })
            } else {
                return result
                    .update(req.body)
                    .then(() => {
                        res.status(200).json({ message: `Les informations de l'utisateur ${result.username}${result.dataValues.id} a été modifié.`, data: result })
                    })
            }
        }).catch((error) => {
            if (error instanceof ValidationError) {
                return res.status(404).json({ message: error.message })

            }
            res.status(500).json({ message: `L'élément n'a pas pas été modifié. Une erreur est survenue :${error}` })
        })
}