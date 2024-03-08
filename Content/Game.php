<?php
    include 'Components/head.php';

    if ($_SESSION['loggedin'] == false) {
        header('Location: index.php');
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="Scribbles/game.css">
    <link rel="stylesheet" href="Scribbles/style.css">
    <title>Cosmic Besiege - Game</title>
    <style>
        #main {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            color: white;
        }
    </style>
    <script>
        function exit() {
            window.location.href = 'index.php';
        }
    </script>
</head>
<body>
    <div id="main" class="gameContainer">
        <button onclick="exit()" class="btn btn-primary position-absolute top-0 start-50 translate-middle-x">Exit Game</button>
        <p id="refreshrate" style="display: none;"></p>
        <canvas>
        </canvas>
        <h1 id="timer"></h1>
        <h1 id="life"></h1>
        <h1 id="infos"></h1>
        <h1 id="scoreboard"></h1>
        <div id="gameOver">
            <h2>Game over</h2>
            <p id="scoreCount"></p>
            <p id="timeCount"></p>
            <button id="restart" onclick="restartGame()">Restart Game</button>
        </div>
        <script src="Game.js"></script>
    </div>
</body>
</html>