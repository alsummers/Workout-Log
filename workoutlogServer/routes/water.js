var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user.js')
var Water = sequelize.import('../models/water.js')

router.post('/', function(req, res){
    var owner = req.user.id
    var water = req.body.water
    console.log("Water :", water)


    Water.create({
        amount: water.amount,
        owner: owner
    })
    .then(
        function createSuccess(water){
            res.json(water);
        },
        function createError(err){
            res.send(500, err.message)
        }
    );
});

router.get('/', function(req, res) {
    // console.log('**REQUESTS**', req)
    var userid = req.user.id;
    console.log ('**USERIDLOG', userid)

    Water.findAll({
        where: {owner: userid}
    })
    .then(
        function findAllSuccess(data){
            res.json(data)
        },
        function findAllError(err){
            res.send(500, err.message)
        }
    );
});

module.exports = router;