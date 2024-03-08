<?php
session_start();

$refreshrate = $_POST["refresh"];
// make it an integer
$refreshrate = intval($refreshrate);
$_SESSION['refreshrate'] = $refreshrate;
echo $_SESSION['refreshrate'];