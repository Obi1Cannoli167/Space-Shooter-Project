$(document).ready(function () {
  $("input[name='Register']").click(function () {
    var username = $("input[name='RegUsername']").val();
    var password = $("input[name='RegPassword']").val();
    var email = $("input[name='RegEmail']").val();
    $.ajax({
      url: "Queries/register.php",
      type: "POST",
      data: {
        username: username,
        password: password,
        email: email,
      },
      success: function (data) {
        // if data contains Error inside, then change the color to red¨
        $("#info").text(data);
        if (data.includes("Error")) {
          $("#info").css("color", "red");
        } else {
          $("#info").css("color", "green");
          // replace the content of the form to a message
          $("#reg").html("<h3>Registered successfully</h3>");
          setTimeout(function () {
            window.location.href = "log.php";
          }, 1000);
        }
        setTimeout(function () {
          $("#info").text("");
        }, 2000);
      },
    });
  });

  $("input[name='Login']").click(function () {
    var username = $("input[name='LogUsername']").val();
    var password = $("input[name='LogPassword']").val();
    $.ajax({
      url: "Queries/login.php",
      type: "POST",
      data: {
        username: username,
        password: password,
      },
      success: function (data) {
        $("#info").text(data);
        // if data contains Error inside, then change the color to red¨
        if (data.includes("Error")) {
          $("#info").css("color", "red");
          setTimeout(function () {
            $("#info").text("");
          }, 2000);
        } else {
          $("#info").css("color", "green");
          $("#log").html("<h3>Welcome!</h3>");
          setTimeout(function () {
            window.location.href = "index.php";
          }, 1000);
        }
      },
    });
  });
  $("#play").click(function () {
    window.location.href = "Game.php";
  });
  $("#leaderboards").click(function () {
    window.location.href = "Leaderboards.php";
  });
  $("#home").click(function () {
    window.location.href = "index.php";
  });
  // there is a select menu to choose the refresh rate which is stored in the session in php
  $("select[name='refreshrate']").change(function () {
    var refresh = $("select[name='refreshrate']").val();
    $.ajax({
      url: "Queries/refreshrate.php",
      type: "POST",
      data: {
        refresh: refresh,
      },
      success: function (data) {
        console.log(data);
        setTimeout(function () {
          $("#refrateinfo").text("Your configuration is set to " + data + "Hz");
        }, 100);
      },
    });
  });

  $.ajax({
    url: "Queries/getRefreshrate.php",
    type: "POST",
    success: function (data) {
      setTimeout(function () {
        $("#refrateinfo").text("Your configuration is set to " + data + "Hz");
      }, 100);
    },
  });

  $(".deleteScore").click(function () {
    var score_id = $(this).parent().parent().find("input").val();
    $.ajax({
      url: "Components/deleteScore.php",
      type: "POST",
      data: {
        score_id: score_id,
      },
      success: function (response) {
        if (response == "success") {
          $("#" + score_id).remove();
          $("#globalLeaderBoard").load("Queries/loadLeaderboard.php");
        }
      },
    });
  });
});
