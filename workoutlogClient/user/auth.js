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
        }

        //login method

        //loginoutmethod
    });
    //bind events
});