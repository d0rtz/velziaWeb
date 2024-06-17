<?php 

session_start(); 

include "db_conn.php";

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
                header("Location: panel.php");
                exit();
            } else {
                header("Location: index.php?error=Datos de acceso incorrectos");
                exit();
            }
        } else {
            header("Location: index.php?error=Datos de acceso incorrectos");
            exit();
        }
    }
} else {
    header("Location: index.php");
    exit();
}
?>
