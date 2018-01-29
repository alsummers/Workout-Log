$(function(){
    $.extend(WorkoutLog, {
        //signup method
        signup: function(){
            //username password variables
            var username = $('#su_username').val();
            var password = $('#su_password').val();
            //user object
            var user = {
                user: {
                    username: username,
                    password: password
                }
        };
            //sign up post
            var signup = $.ajax({
                type: "POST",
                url: WorkoutLog.API_BASE + "user",
                data: JSON.stringify( user ),
                contentType: "application/json"
            });
            //sign up fail/done
            signup.done(function(data){
                if(data.sessionToken){
                    WorkoutLog.setAuthHeader(data.sessionToken);
                }
                $("#signup-modal").modal("hide");
                $("#.disabled").removeClass("disabled");
                $("#loginout").text("Logout");
            }).fail(function(){
                $("su_error").text("There was an issue with sign up").show();
            });
        }

        //login method

        //loginoutmethod
    });
    $("#signup").on("click", WorkoutLog.signup);
});