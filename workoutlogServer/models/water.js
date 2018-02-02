module.exports = function(sequelize, DataTypes) {
    //With define, the first argument is going to represent a column in the db table
            return sequelize.define('water', {
                amount: DataTypes.INTEGER,
                owner: DataTypes.INTEGER
            },{
        });
    };

 /*
    POSTMAN TEST:
    {
        "water:{
            "amount":"80.",
            
        }
    }
    */