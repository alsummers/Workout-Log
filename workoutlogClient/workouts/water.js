$(function() {
	$.extend(WorkoutLog, {
		water: {
			userIntake: [],

			create: function() {

				var fluid = { 
		         		amount: $("#fluid-intake").val(),
				};
				var postData = { water: fluid };
		      	var waterIntake = $.ajax({

         	type: "POST",
	         	url: WorkoutLog.API_BASE + "water",
	         	data: JSON.stringify(postData),
	         	contentType: "application/json"
		      	});

		      	waterIntake.done(function(data) {
	      			WorkoutLog.water.userIntake.push(data.water);
					$("#fluid-intake").val("");
					$('a[href="#history"]').tab("show");

		      	});
		  },

		  fetchAll: function() {
			 var fetchDefs = $.ajax({
		         type: "GET",
		         url: WorkoutLog.API_BASE + "water",
		         headers: {
		         	"authorization": window.localStorage.getItem("sessionToken")
		         }
		      })
		      .done(function(data) {
		         WorkoutLog.water.userIntake = data;
		      })
		      .fail(function(err) {
		         console.log(err);
		      });
		  }
		}
	});

	// bindings
		$("#fluid-save").on("click", WorkoutLog.water.create);


   // fetch definitions if we already are authenticated and refreshed
    if (window.localStorage.getItem("sessionToken")) {
      WorkoutLog.water.fetchAll();
   }
   
});