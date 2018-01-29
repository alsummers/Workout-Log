var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');
var Definition = sequelize.import('../models/definition.js');

router.post('/', function(req, res) {
    //variables
    var description = req.body.definition.desc;
    var logType = req.body.definition.type;
    var owner = req.user.id;

    //methods
    Definition
            .create({
                description: descripton,
                logType: logType,
                owner: owner

            })
            .then(
                function createSuccess(definition) {
                    //send a response as json
                    res.json({
                        definition: definition //create Success function
                    });
                },
                function createError(err) {//createError function
                    res.send(500, err.message);
                }
            );
});
router.get('/', function(req, res){
    //user variable
    var userid = req.user.id;
    Definition
    .findAll({
        where: {owner: userid}
    })
    .then(
        function findAllSuccess(data){
            res.json(data);
        },
        //failure
        function findAllError(err){
            res.send(500,err.message);
        }
    );
});

module.exports = router;