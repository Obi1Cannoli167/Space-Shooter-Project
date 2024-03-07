<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="Scribbles/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="Scribbles/queries.js" defer></script>
    <title>Cosmic Besiege</title>
    <?php
    include "Components/head.php";
    ?>
</head>

<body>
    <?php
    include "Components/header.php";
    ?>
    <div class="container">
        <div class="row align-items-start">
            <div class="col-6">
                <p class="display-6">Welcome to our project!</p>
                <p class="lead">This is a game that we are developing for our final project in our client-side scripting class which uses vanilla JavaScript.</p>
                <!-- list of features about the game -->
                <p>Features about our game:</p>
                <ul>
                    <li>It is object-oriented with the use of prototypes</li>
                    <li>It uses the canvas element</li>
                    <li>It uses the requestAnimationFrame method</li>
                    <li>It uses the addEventListener method</li>
                    <li>It uses the Math.random method for the placement of enemies</li>
                </ul>
            </div>
            <div class="col-6 right">
                <div class="img">
                    <?php
                    if ($_SESSION["loggedin"] == true) {
                    ?>
                        <button id="play" class="btn btn-primary position-relative top-50 start-50 translate-middle-x"><span class="display-5">Play Game</span></button>
                    <?php
                    } else {
                    ?>
                        <p class="lead">Please log in to play</p>
                    <?php
                    }
                    ?>
                </div>

            </div>
        </div>
    </div>
    <!-- footer -->
    <?php
    include "Components/footer.php";
    ?>
</body>

</html>