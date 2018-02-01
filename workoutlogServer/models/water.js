module.exports = function (sequelize, DataTypes) {
    return sequelize.define ('water', {
        amount: DataTypes.INTEGER,
        owner: DataTypes.INTEGER
    },{

    });
};