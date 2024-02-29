<?php
// session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SpaceDB";
$conn = mysqli_connect($servername, $username, $password, $dbname);

$username = $_POST["username"];
$password = $_POST["password"];
$email = $_POST["email"];

if (strlen($username) < 6) {
    echo "Username has to be minimum 6 characters long";
} else {
    echo "All good";
}