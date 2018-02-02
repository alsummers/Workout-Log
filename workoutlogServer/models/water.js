module.exports = function (sequelize, DataTypes) {
    return sequelize.define ('water', {
        amount: DataTypes.INTEGER,
        owner: DataTypes.INTEGER
    },{

    });
};

 /*
    POSTMAN TEST:
    {
        "water:{
            "amount":"Running my heart out as fast I could for 70 miles.",
            
        }
    }
    */