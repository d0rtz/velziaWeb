<?php
session_start();
if (isset($_SESSION['id']) && isset($_SESSION['user'])) {
 ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title>Panel</title>
    <link rel="stylesheet" href="panel.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
<body onload=pisosWindow()>
<div id="myModal" class="modal">
    <div class="modal-content">
        <span id="modal-close">&times;</span>
        <div id="modal-text-div">
        </div>
    </div>
</div>
  <div class="sidebar">
    <div class="logo-details">
      <span class="logo_name">VELZIA</span>
    </div>
      <ul class="nav-links">
        <li>
          <a onclick=homeWindow()>
            <i class='bx bx-grid-alt' ></i>
            <span class="links_name">Inicio</span>
          </a>
        </li>
        <li>
          <a onclick=gamasWindow()>
            <i class='bx bx-box' ></i>
            <span class="links_name">Gamas</span>
          </a>
        </li>
        <li>
          <a onclick=pisosWindow()>
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Pisos</span>
          </a>
        </li>
        <li>
          <a onclick=analiticasWindow()>
            <i class='bx bx-pie-chart-alt-2' ></i>
            <span class="links_name">Analiticas</span>
          </a>
        </li>
        <li>
          <a onclick=ajustesWindow()>
            <i class='bx bx-cog' ></i>
            <span class="links_name">Ajustes</span>
          </a>
        </li>
        <li class="log_out">
          <a>
            <i class='bx bx-log-out'></i>
            <span class="links_name">
                <form action="logout.php" method="post" id="logout-form">
                    <button type="submit" id="logout-btn" >Salir</button>
                </form>
            </span>
          </a>
        </li>
      </ul>
  </div>
  <section class="home-section">
    <nav>
      <div class="sidebar-button">
        <i class='bx bx-menu sidebarBtn'></i>
        <span class="dashboard">Panel</span>
      </div>
      <div class="profile-details">
        <img src="/usr/share/nginx/html/velzia/resources/android-chrome-192x192.PNG" alt="">
        <span class="admin_name">Hola, <?php echo $_SESSION['name']; ?></span>
      </div>
    </nav>
    <div class="home-content" id="home-content">
      
    </div>
  </section>

  <script>
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebarBtn.onclick = function() {
        sidebar.classList.toggle("active");
        if(sidebar.classList.contains("active")){
            sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
        }else
            sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
 </script>
 <script src="../js/panel.js"></script>
</body>
</html>
<?php 

}else{
     header("Location: index.php");
     exit();
}
?>