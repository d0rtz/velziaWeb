// When the user scrolls the page, execute stickyHeader
window.onscroll = function () {
  stickyHeader();
};

const querystring = window.location.search;
const params = new URLSearchParams(querystring);
var utmSource = params.get("utm_source");
var utmMedium = params.get("utm_medium");
var utmCampaign = params.get("utm_campaign");
console.log(
  "UTM Source " +
    utmSource +
    " campaign " +
    utmCampaign +
    " medium " +
    utmMedium
);

// Get the header
var header = document.getElementById("header");
var navLogo = document.getElementById("nav-logo");
var navLink = document.getElementsByClassName("nav-link");
var phoneIcon = document.getElementById("phone-icon");
var hamburguerIcon = document.getElementById("hamburguer-icon");
var closeMobileHeaderButton = document.getElementById(
  "close-mobile-header-button"
);
var mobileHeader = document.getElementById("mobile-header");
var mobileHeaderBackground = document.getElementById(
  "mobile-header-background"
);
var mobileSubnavImage = document.getElementById("mobile-subnav-image");
var mobileDropdownBtn = document.getElementById("mobile-dropdown-btn");
var mobileSubnav = document.getElementById("mobile-subnav");
var subNavA = document.getElementById("collection-li");
var subNav = document.getElementById("subnav");
var number = document.getElementById("number");
var mobileNumber = document.getElementById("mobile-number");

if(utmSource == null){
  number.href="tel:+34911989927";
  number.innerHTML = "34 911 989 927";
  mobileNumber.href="tel:+34911989927";
  mobileNumber.innerHTML = "34 911 989 927";
}else{

}

subNavA.addEventListener("mouseenter", (event) => {
  console.log(event + " Abre submenú");
  subNav.style.display = "block";
});

subNavA.addEventListener("mouseleave", (event) => {
  console.log(event + " Cierra submenú");
  subNav.style.display = "none";
});


var intervalId = null;
hamburguerIcon.addEventListener("click", (event) => {
  console.log(event + " Abre menú movil");
  var pos = -300;
  clearInterval(intervalId);
  id = setInterval(moveNav, 1);
  function moveNav() {
    if (pos == 0) {
      clearInterval(intervalId);
    } else {
      pos = pos + 10;
      mobileHeader.style.right = pos + "px";
    }
  }

  mobileHeaderBackground.style.display = "block";
});

mobileDropdownBtn.addEventListener("click", (event) => {
  if (mobileSubnav.style.display == "none") {
    mobileSubnav.style.display = "block";
    mobileSubnavImage.src = "./resources/x.png";
  } else {
    mobileSubnav.style.display = "none";
    mobileSubnavImage.src = "./resources/plus.png";
  }
});

var intervalId2 = null;
closeMobileHeaderButton.addEventListener("click", (event) => {
  console.log(event + " Cierra menú movil");
  //mobileHeader.style.left = "";
  var pos = 0;
  clearInterval(intervalId2);
  id = setInterval(moveNav, 10);
  function moveNav() {
    if (pos == -300) {
      clearInterval(intervalId2);
    } else {
      pos = pos - 10;
      mobileHeader.style.right = pos + "px";
    }
  }
  mobileHeaderBackground.style.display = "none";
});

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    header.style.position = "fixed";
    header.classList.remove("header-color");
    header.classList.remove("header-black");
    header.classList.add("header-white");
    hamburguerIcon.src = "./resources/hamburguesa.png";
    navLogo.src = "./resources/logo-dark-def.png";
    phoneIcon.style.color = "black";
    for (let index = 0; index < navLink.length; index++) {
      navLink[index].classList.remove("nav-link-white");
      navLink[index].classList.add("nav-link-black");
    }
  } else {
    header.classList.remove("sticky");
    header.style.position = "absolute";
    header.classList.remove("header-color");
    header.classList.remove("header-white");
    header.classList.add("header-black");
    hamburguerIcon.src = "./resources/hamburguesa-blanco.png";
    navLogo.src = "./resources/logo-index-def.png";
    phoneIcon.style.color = "#f1f1f1";
    for (let index = 0; index < navLink.length; index++) {
      navLink[index].classList.remove("nav-link-black");
      navLink[index].classList.add("nav-link-white");
    }
  }
}
