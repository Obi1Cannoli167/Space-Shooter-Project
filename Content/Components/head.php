<?php
session_start();

if (!isset($_SESSION['loggedin'])) {
    $_SESSION['loggedin'] = false;
}

if (!isset($_SESSION['username'])) {
    $_SESSION['username'] = "";
}