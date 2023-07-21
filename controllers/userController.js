const { UniqueConstraintError, ValidationError } = require('sequelize')
const { UserModel } = require('../db/sequelize')
const bcrypt = require('bcrypt');

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



exports.updateUser = (req, res) => {

    UserModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: `Aucun utilisateur n'a été trouvé avec l'id :${req.params.id}` })
            } else {
                return bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const dataUser = { ...req.body, password: hash }

                        return result
                            .update(dataUser)
                            .then(() => {
                                res.status(200).json({ message: `Les informations de l'utisateur ${result.username} a été modifié.`, data: result })
                            })
                    })
            }
        }).catch((error) => {
            if (error instanceof ValidationError) {
                return res.status(404).json({ message: error.message })

            }
            res.status(500).json({ message: `L'élément n'a pas pas été modifié. Une erreur est survenue :${error}` })
        })
}

exports.deleteUser = (req, res) => {
    UserModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: `Aucun utilisateur n'a été trouvé` })
            } else {
                return result
                    .destroy()
                    .then(() => {
                        res.status(200).json({ message: `L'utilisateur' ${result.dataValues.id} a été supprimé.`, data: result })
                    })
            }
        }).catch((error) => {
            res.status(500).json({ message: `L'élément n'a pas pu être supprimé :${error}` })
        })
}

exports.findUserByPk = (req, res) => {
    UserModel
        .findByPk(req.params.id)

        .then((result) => {
            if (!result) {
                res.status(404).json({ message: `L'utilisateur ayant l'id n° ${req.params.id} n'existe pas` })
            } else {
                res.status(200).json({ message: `L'utilsateur ayant l'id n° ${result.id} a bien été récuperé`, data: result })
            }

        })
        .catch((error) => {
            res.status(500).json({ message: `Une erreur est survenue :${error}` })
        })
}