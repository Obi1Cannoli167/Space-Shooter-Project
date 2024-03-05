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

$sql = "select * from players where username = '$username'";
$result = mysqli_query($conn, $sql);
if (empty($username) || empty($email) || empty($password)) {
    die("Please fill in all of the required fields.");
} if (mysqli_num_rows($result) > 0) {
    echo "Username already taken.";
} else {
    $sql = "select * from players where email = '$email'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        echo "Email address already taken.";
    } else {
        if (strlen($username) < 6) {
            echo "Username has to be minimum 6 characters long";
        } else if (strlen($password) < 6) {
            echo "Password has to be minimum 6 characters long";
        } else {
            $sql = "INSERT INTO players (username, email, password) VALUES ('$username', '$email', '$password')";
            if (mysqli_query($conn, $sql)) {
                echo "Account created successfully.";
            } else {
                echo "Failed to create account.";
            }
        }
    }
}