<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Scribbles/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="Scribbles/queries.js" defer></script>
    <title>Noggin</title>
    <?php
    include "Scribbles/head.php";
    ?>
</head>

<body>
    <div id="main">
        <div>
            <form method="post">
                <input name="RegUsername" type="text" placeholder="Username">
                <input name="RegEmail" type="email" placeholder="Email address">
                <input name="RegPassword" type="password" placeholder="Password">
                <input id="register" name="Register" type="button" value="Register">
            </form>
            <p id="info"></p>
        </div>
    </div>
</body>

</html>