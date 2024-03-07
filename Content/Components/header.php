<header>
    <p class="display-1">Cosmic Besiege</p>
    <div>
        <h3 class="display-6">
            <?php
            if ($_SESSION["loggedin"] != true) {
            ?>
                <a href="log.php">Login</a>
                /
                <a href="reg.php">Register</a>
            <?php
            } else {
            ?>
                <p>
                    Welcome, <?php echo $_SESSION["username"]; ?> &nbsp;
                    | &nbsp;
                    <a href="Components/logout.php">Log out</a>
                </p>
            <?php
            }
            ?>
        </h3>
    </div>
</header>