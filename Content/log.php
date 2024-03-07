<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./Scribbles/bootstrap-5.3.3-dist/bootstrap-5.3.3-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="Scribbles/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="Scribbles/queries.js" defer></script>
    <title>Noggin</title>
    <?php
    include "Components/head.php";
    ?>
</head>

<body>
    <div class="container-sm center">
        <form method="post" id="log">
            <div class="mb-3">
                <label for="LogUsername" class="form-label">Username</label>
                <input name="LogUsername" type="text" class="form-control" id="LogUsername" aria-describedby="LogUsernameHelp">
            </div>
            <div class="mb-3">
                <label for="LogPassword" class="form-label">Password</label>
                <input name="LogPassword" type="password" class="form-control" id="LogPassword" aria-describedby="LogPasswordHelp">
            </div>
                <input id="login" name="Login" type="button" value="Login" class="btn btn-primary">
            <p id="info"></p>
        </form>
    </div>
</body>

</html>