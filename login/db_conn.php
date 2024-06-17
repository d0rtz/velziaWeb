<?php

$sname= "79.137.45.155";

$uname= "root";

$password = "202121";

$db_name = "velzia";

$conn = mysqli_connect($sname, $uname, $password, $db_name);

if (!$conn) {

    echo "Connection failed!";

}