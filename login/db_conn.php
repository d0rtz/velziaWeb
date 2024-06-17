<?php

$sname= "localhost";

$uname= "root";

$password = "202121";

$db_name = "velzia";

$conn = mysqli_connect($sname, $uname, $password, $db_name);

if (!$conn) {

    echo "Connection failed!";

}