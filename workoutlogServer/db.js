var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'SeaBass44', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);


var User = sequelize.import('./models/user');
var Log = sequelize.import('./models/log');
var Definition = sequelize.import('./models/definition');
var Water = sequelize.import('./models/water'); //added for challenge;
module.exports = sequelize;