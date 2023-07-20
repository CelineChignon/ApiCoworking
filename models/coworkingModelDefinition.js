module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', {
        name: DataTypes.STRING,
        price: DataTypes.JSON,
        adress: DataTypes.JSON,
        superficy: DataTypes.INTEGER,
        capacity: DataTypes.INTEGER,

    });
}