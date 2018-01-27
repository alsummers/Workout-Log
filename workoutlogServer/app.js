let express=require('express');
let app=express();
let bodyParser = require('body-parser');
let sequelize = require('./db.js');
let User = sequelize.import('./models/user.js')

User.sync();
// =====Danger will Robsinson will force delete user table
// User.sync({force:true})
//=======

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
    res.send("Hello World!")
});
app.listen(3000, function(){
    console.log("app is open on 3000!");
});


//build a user model in sqllize


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