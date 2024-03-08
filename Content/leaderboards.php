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
    <title>Cosmic Besiege - Leaderboards</title>
    <?php
    include "Components/head.php";
    if ($_SESSION['loggedin'] == false) {
        header('Location: index.php');
    }
    ?>
</head>

<body>
    <?php
    include "Components/header.php";
    ?>
    <div class="container">
        <div class="row align-items-start">
            <!-- leaderboards button -->
            <div class="col-12">
                <button id="home" class="btn btn-primary position-relative top-50 start-50 translate-middle-x"><span class="display-5">Home</span></button>
            </div>
            <!-- your highest personal score section and up against other players -->
            <div class="col-6">
                <p id="personalScore" class="position-relative top-50 start-50 translate-middle-x display-5 text-center">Your Highest</p>
                <table class="table table-dark table-striped">
                    <tr>
                        <th scope="col">position</th>
                        <th scope="col">Score</th>
                        <th scope="col">Time</th>
                        <th scope="col">Date</th>
                        <th scope="col">Deletion</th>
                    </tr>
                    <?php
                    $conn = mysqli_connect("localhost", "root", "", "SpaceDB");

                    $position = 1;
                    $sql = "SELECT * FROM scores WHERE username = '" . $_SESSION['username'] . "' ORDER BY score DESC";
                    $result = mysqli_query($conn, $sql);
                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                    ?>
                            <!-- make it a table -->
                            <tr id="<?= $row['score_id'] ?>">
                                <input type="hidden" value="<?php echo $row['score_id']; ?>">
                                <th scope="row"><?=$position?></th>
                                <td><?php echo $row['score']; ?></td>
                                <td><?php echo $row['playtime']; ?></td>
                                <td><?php echo $row['play_date']; ?></td>
                                <td><button class="btn btn-primary btn-sm deleteScore">Delete</button></td>
                            </tr>
                    <?php
                        $position++;
                        }
                    }
                    ?>
                </table>
            </div>
            <div class="col-6" id="globalLeaderBoard">
                <p id="globalScore" class="position-relative top-50 start-50 translate-middle-x display-5 text-center">Hall of Fame</p>
                <table class="table table-dark table-striped">
                    <tr>
                        <th scope="col">position</th>
                        <th scope="col">Username</th>
                        <th scope="col">Score</th>
                        <th scope="col">Time</th>
                        <th scope="col">Date</th>
                    </tr>
                    <?php
                    $position = 1;
                    $sql = "SELECT * FROM scores ORDER BY score DESC LIMIT 10";
                    $result = mysqli_query($conn, $sql);
                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                    ?>
                            <!-- make it a table -->
                            <tr <?= $row['username'] == $_SESSION['username'] ? 'class="table-primary"' : '' ?>>
                                <th scope="row"><?=$position?></th>
                                <td><?php echo $row['username']; ?></td>
                                <td><?php echo $row['score']; ?></td>
                                <td><?php echo $row['playtime']; ?></td>
                                <td><?php echo $row['play_date']; ?></td>
                            </tr>
                    <?php
                        $position++;
                        }
                    }
                    ?>
                </table>
            </div>

        </div>
        <!-- footer -->
        <?php
        include "Components/footer.php";
        ?>
</body>

</html>