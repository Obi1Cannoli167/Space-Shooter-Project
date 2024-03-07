$(document).ready(function() {
    $("input[name='Register']").click(function() {
        var username = $("input[name='RegUsername']").val();
        var password = $("input[name='RegPassword']").val();
        var email = $("input[name='RegEmail']").val();
        $.ajax({
            url: "Queries/register.php",
            type: "POST",
            data: {
                username: username,
                password: password,
                email: email
            },
            success: function(data) {
                // if data contains Error inside, then change the color to red¨
                $("#info").text(data);
                if (data.includes("Error")) {
                    $("#info").css("color", "red");
                } else {
                    $("#info").css("color", "green");
                }
                setTimeout(function() {
                    $("#info").text("");
                }, 2000);
            }
        });
    });

    $("input[name='Login']").click(function() {
        var username = $("input[name='LogUsername']").val();
        var password = $("input[name='LogPassword']").val();
        $.ajax({
            url: "Queries/login.php",
            type: "POST",
            data: {
                username: username,
                password: password
            },
            success: function(data) {
                $("#info").text(data);
                // if data contains Error inside, then change the color to red¨
                if (data.includes("Error")) {
                    $("#info").css("color", "red");
                    setTimeout(function() {
                        $("#info").text("");
                    }, 2000);
                } else {
                    $("#info").css("color", "green");
                    setTimeout(function() {
                        window.location.href = "index.php";
                    }, 500);
                }
            }
        });
    });
    $("#play").click(function() {
        window.location.href = "Game.php";
    });
});

