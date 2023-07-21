module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Ce champs est obligatoire` }
            },
            unique: { msg: `Le nom de ce coworking est déjà utilisé` }
        },
        price: {
            type: DataTypes.JSON,
            validate: {
                validatorPrice(price) {
                    if (price.hasOwnProperty(`hour`) && price.hasOwnProperty(`day`) && price.hasOwnProperty(`month`)) {
                        if (price.hour === null && price.day === null && price.month === null) {
                            throw new Error("Le prix d'un coworking doit spécifier au moins un prix"
                            );
                        }
                    } else {
                        throw new Error("La syntaxe des données est incorrects")
                    }

                },
            },
        },
        adress: DataTypes.JSON,
        superficy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `La superficie doit être un nombre entier` },
                notEmpty: { msg: `Ce champs est obligatoire` },
                isNumeric: { msg: `La superficie doit être un nombre ` }
            }
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Le nombre de place doit être un nombre entier` },
                notEmpty: { msg: `Ce champs est obligatoire` },
                isNumeric: { msg: `Le nombre de place du coworking doit être un nombre` }
            }
        }

    });
}