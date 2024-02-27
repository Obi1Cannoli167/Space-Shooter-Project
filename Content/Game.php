<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Scribbles/game.css">
    <title>Project</title>
    <style>

    </style>
</head>
<body>
    <canvas>
    </canvas>
    <h1 id="timer"></h1>
    <h1 id="life"></h1>
    <h1 id="info"></h1>
    <h1 id="scoreboard"></h1>
    <div id="gameOver">
        <h2>Game over</h2>
        <p id="scoreCount"></p>
        <p id="timeCount"></p>
        <button id="restart" onclick="restartGame()">Restart Game</button>
    </div>
        <script src="Game.js"></script>
        
</body>
</html>