<?php
session_start();

$score = $_POST['score'];
$playtime = $_POST['time'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SpaceDB";

$conn = mysqli_connect($servername, $username, $password, $dbname);

$sql = "select * from players where username = '" . $_SESSION['username'] . "'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$playerid = $row['player_id'];

$sql = "insert into scores (play_date, score, playtime, player_id, username) values (now(), $score, $playtime, $playerid, '" . $_SESSION['username'] . "')";
$result = mysqli_query($conn, $sql);
if ($result) {
    echo "Score inserted.";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
