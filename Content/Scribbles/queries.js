$(document).ready(function() {
    $("input[name='Register']").click(function() {
        var username = $("input[name='RegUsername']").val();
        var password = $("input[name='RegPassword']").val();
        var email = $("input[name='RegEmail']").val();
        $.ajax({
            url: "../Queries/register.php",
            type: "POST",
            data: {
                username: username,
                password: password,
                email: email
            },
            success: function(data) {
                $("#info").text(data);
            }
        });
    });
});