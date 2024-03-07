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

<body id="space">
    <div id="main">
        <div class="container-sm center">
            <form method="post" id="reg">
                <div class="mb-3">
                    <label for="RegUsername" class="form-label">Username</label>
                    <input name="RegUsername" type="text" class="form-control" id="RegUsername" aria-describedby="RegUsernameHelp">
                </div>
                <div class="mb-3">
                    <label for="RegEmail" class="form-label">Email address</label>
                    <input name="RegEmail" type="email" class="form-control" id="RegEmail" aria-describedby="RegEmailHelp">
                </div>
                <div class="mb-3">
                    <label for="RegPassword" class="form-label">Password</label>
                    <input name="RegPassword" type="password" class="form-control" id="RegPassword" aria-describedby="RegPasswordHelp">
                </div>
                <div class="mb-3">
                    <input id="register" name="Register" type="button" value="Register" class="btn btn-primary">
                </div>
                <p id="info"></p>
        </div>
    </div>
</body>

</html>