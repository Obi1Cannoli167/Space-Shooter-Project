<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SpaceDB";
$conn = mysqli_connect($servername, $username, $password, $dbname);

$username = $_POST["username"];
$password = $_POST["password"];

$sql = "select * from players where username = '$username'";
$result = mysqli_query($conn, $sql);
if (empty($username) || empty($password)) {
    die("Error: Please fill in all of the required fields.");
}
if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    if ($row["password"] == $password) {
        echo "Login successful.";
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
    } else {
        echo "Error: Incorrect password.";
    }
} else {
    echo "Error: Username not found.";
}