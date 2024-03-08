<?php
session_start();

$conn = new mysqli('localhost', 'root', '', 'SpaceDB');

?>
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
                <th scope="row"><?= $position ?></th>
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