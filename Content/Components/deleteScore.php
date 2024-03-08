<?php
session_start();

$conn = new mysqli("localhost", "root", "", "SpaceDB");
$score_id = $_POST['score_id'];

$sql = "DELETE FROM scores WHERE score_id = $score_id";
$result = $conn->query($sql);
if ($result) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}