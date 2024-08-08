<?php 

session_start(); 

include "db_conn.php";

// Function to get the client's IP address
function getIPAddress() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

$ip_address = getIPAddress();
$max_attempts = 5;
$time_limit = 24 * 60 * 60; // 24 hours in seconds

// Check if the IP address is blocked
$sql = "SELECT attempts, last_attempt FROM login_attempts WHERE ip_address = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $ip_address);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $last_attempt_time = strtotime($row['last_attempt']);
    $current_time = time();

    // Check if the last attempt was more than 24 hours ago
    if (($current_time - $last_attempt_time) > $time_limit) {
        // Reset the failed attempts count
        $sql = "DELETE FROM login_attempts WHERE ip_address = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $ip_address);
        mysqli_stmt_execute($stmt);
    } elseif ($row['attempts'] >= $max_attempts) {
        echo "Has sido bloqueado debido a demasiados intentos fallidos. Por favor, intenta más tarde.";
        exit();
    }
}

if (isset($_POST['uname']) && isset($_POST['password'])) {

    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $uname = validate($_POST['uname']);
    $pass = validate($_POST['password']);

    if (empty($uname)) {
        header("Location: index.php?error=Nombre de usuario obligatorio");
        exit();
    } else if(empty($pass)){
        header("Location: index.php?error=Contraseña obligatoria");
        exit();
    } else {
        // Usar consultas preparadas para evitar SQL Injection
        $sql = "SELECT * FROM users WHERE user=? AND pass=?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $uname, $pass);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) === 1) {
            $row = mysqli_fetch_assoc($result);
            if ($row['user'] === $uname && $row['pass'] === $pass) {
                echo "Logged in!";
                $_SESSION['user'] = $row['user'];
                $_SESSION['name'] = $row['name'];
                $_SESSION['id'] = $row['id'];

                // Reset the failed attempts on successful login
                $sql = "DELETE FROM login_attempts WHERE ip_address = ?";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, "s", $ip_address);
                mysqli_stmt_execute($stmt);

                header("Location: panel.php");
                exit();
            } else {
                header("Location: index.php?error=Datos de acceso incorrectos");
                exit();
            }
        } else {
            // Log the failed attempt
            $sql = "INSERT INTO login_attempts (ip_address, attempts) VALUES (?, 1) ON DUPLICATE KEY UPDATE attempts = attempts + 1, last_attempt = NOW()";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $ip_address);
            mysqli_stmt_execute($stmt);

            header("Location: index.php?error=Datos de acceso incorrectos");
            exit();
        }
    }
} else {
    header("Location: index.php");
    exit();
}
?>
