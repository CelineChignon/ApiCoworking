
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Ce champs est obligatoire` },
                notNull: { msg: `Ce champs ne peut être null` }
            },
            unique: { msg: `Ce nom d'utilisateur est déjà utilisé` }
        },
        password: DataTypes.STRING
    })
}