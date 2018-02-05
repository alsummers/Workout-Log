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
			},

			getChart: function() {
				var ctx = $("#progressChart");
				var newChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: ["oz."],
						datasets: [{
							label: "Fluid Intake",
							data: [WorkoutLog.water.userIntake],
							backgroundColor: [
								'rgba(0, 191, 255, 0.2'
							],
							borderColor: [
								'rgba(0, 191, 255, 1)'
							],
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
		  }
		}
		
	});

	// bindings
		$("#fluid-save").on("click", WorkoutLog.water.create);
		WorkoutLog.water.getChart();

		

   // fetch definitions if we already are authenticated and refreshed
    if (window.localStorage.getItem("sessionToken")) {
      WorkoutLog.water.fetchAll();
   }
   console.log("UserIntake:", WorkoutLog.water.userIntake)
});