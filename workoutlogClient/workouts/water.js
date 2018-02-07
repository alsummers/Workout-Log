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
						WorkoutLog.water.fetchAll();

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
					let waterArray = []
					for(i = 0; i < data.length; i++) {
					var waterBar = waterArray.push(data[i].amount)
					}

					let dateArray = []
					for(let result of WorkoutLog.water.userIntake) {
						let date = result.createdAt.slice(0,10);
						console.log(date)
						let dateOrder = result.createdAt.replace(/\D/g, '')
						dateArray.push({
							date,
							dateOrder
						})
					}
					dateArray.sort(function(a, b) {
	    				return parseFloat(a.dateOrder) - parseFloat(b.dateOrder);
					});
					let newdateArray = dateArray.map(function(a) {return a.date;})
					var ctx = $("#progressChart");
					var newChart = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: newdateArray,
							datasets: [{
								label: "Daily Fluid Intake",
								data: waterArray,
								backgroundColor:
									'rgba(0, 191, 255, 0.5',
								borderColor:
									'rgba(0, 191, 255, 1)',
								borderWidth: 2
							}]
						},
						options: {
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true
									}
								}]
							}
						}
					})
				})
				.fail(function(err) {
					console.log(err);
				});
			},

			getChart: function() {
				
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