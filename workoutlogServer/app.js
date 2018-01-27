let express=require('express');
let app=express();
let bodyParser = require('body-parser');

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
    res.send("Hello World!")
});
app.listen(3000, function(){
    console.log("app is open on 3000!");
});

let Sequelize = require('sequelize');

let sequelize = new Sequelize('workoutlog', 'postgres', 'SeaBass44', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('connected to workoutlog postgres db')
    },
    function(err){
        console.log(err)
    }
);

//build a user model in sqllize

let User = sequelize.define('user', {
    username: Sequelize.STRING,
    passwordhash: Sequelize.STRING,
});
User.sync();
// =====Danger will Robsinson will force delete user table
// User.sync({force:true})
//=======
app.use(bodyParser());

app.post('/api/user', function(req, res) {
    let username = req.body.user.username;
    let pass = req.body.user.password;
    User.create({
        username: username,
        passwordhash: ""
    }).then(
        //Sequelize is going to return the object it created from db.
        function createSuccess(user){
            //successful get this;
            res.json({
                user: user,
                message: 'create'
            });
        },
    );
});