var piso = params.get("id");
var url = "https://velzia.es:4999/";
var contactForm = `
<section id="contact-form-section" class="cormorant-garamond-light">
<div id="form-section">
    <div>
        <h3 class="cormorant-garamond-light">
            SOLICITA MÁS INFORMACIÓN
        </h3>
        <div id="form-div">
            <div class="form-container">
            <form action="https://sig-api.chapnikandgiesen.com/api/leads/form" method="post" id="login">
                <div id="form-name">
                <input id="name" type="text" name="full_name" placeholder="Nombre *" required/>
                </div>
                <div id="form-tel">
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Teléfono *"
                    onblur="process(event)"
                    required
                />
                <div
                    class="alert alert-error roboto-regular"
                    style="display: none"
                ></div>
                </div>
                
                <div id="form-email">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Correo electrónico *"
                    required
                  />
                </div>
                <div id="form-warn">
                <p class="roboto-regular">
                    <b>Finalidades:</b> Responder a sus solicitudes y remitirle
                    información comercial de nuestros productos y servicios
                    inmobiliarios, incluso por medios electrónicos.
                    <b>Derechos: </b>Puede retirar su consentimiento y acceder,
                    rectificar, suprimir sus datos y demás derechos en
                    chgg@delegado-datos.com. <b>Más Información </b>en <a href="../politicas/politica-privacidad.html">Política
                    de Privacidad.</a>
                </p>
                </div>
                <div id="form-check1">
                    <input type="checkbox" name="accept_terms" id="privacy-checkbox" required>
                    <label for="privacy-checkbox" class="roboto-regular">He leído y acepto la política de <a href="../politicas/politica-privacidad.html">privacidad</a>.</label>
                </div>
                <div id="form-check2">
                    <input type="checkbox" name="receive_information" id="ad-checkbox" >
                    <label for="ad-checkbox" class="roboto-regular">Acepto recibir información de nuestros inmuebles, incluso por medios electrónicos.</label>
                </div>
                <div id="form-submit">
                <button type="button" id="submit">Enviar</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
<script>
  const phoneInputField = document.querySelector("#phone");
  const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "es",
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/23.0.8/js/utils.js",
  });

  const error = document.querySelector(".alert-error");
  var phone2 = "";
  
  function process(event) {
    event.preventDefault();

    const phoneNumber = phoneInput.getNumber();
    if (!phoneInput.isValidNumber() && phoneNumber != "") {
      error.style.display = "";
      error.innerHTML = "Número inválido.";
    } else {
      error.style.display = "none";
      phone2 = phoneNumber;
    }
  }
   const form = document.getElementById("login");
   const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener("click", function () {
      event.preventDefault();    
      // Verificar si el formulario es válido
      if (form.checkValidity()) {
      // Deshabilitar el botón
      submitBtn.disabled = true;

      let fechaActual = new Date();
      let dia = fechaActual.getDate();
      let mes = fechaActual.getMonth() + 1;
      let anio = fechaActual.getFullYear();
      let horas = fechaActual.getHours();
      let minutos = fechaActual.getMinutes();
      let segundos = fechaActual.getSeconds();
      let fechaYHoraFormateada = dia+'/'+mes+'/'+anio+' '+horas+':'+minutos+':'+segundos;
      console.log(fechaYHoraFormateada);
      let utm_source2 = "";
      let utm_medium2 = "";
      let utm_campaign2 = "";
      let utm_term2 = "";
      let utm_content2 = "";
      let utmParameters = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
      utmParameters.forEach(function(param) {
          var value = localStorage.getItem(param);
          if (value) {
              if(param == "utm_source") {
                  utm_source2 = value;
              }else if(param == "utm_medium") {
                  utm_medium2 = value;
              }else if(param == "utm_campaign") {
                  utm_campaign2 = value;
              }else if(param == "utm_term") {
                  utm_term2 = value;
              }else if(param == "utm_content") {
                  utm_content2 = value;
              }
          }
      });
      let name = document.getElementById("name");
      let email2 = document.getElementById("email");
      let accept_terms2 = document.getElementById("privacy-checkbox");
      let receive_information2 = document.getElementById("ad-checkbox");
      fetch("https://sig-api.chapnikandgiesen.com/api/leads/form", {
        method: "POST",
        body: new URLSearchParams({
          date: fechaYHoraFormateada,
          utm_source: utm_source2,
          utm_medium: utm_medium2 || "WEB",
          utm_campaign: utm_campaign2,
          utm_term: utm_term2,
          utm_content: utm_content2,
          formTitle: window.location,
          house: document.title,
          full_name: name.value,
          phone: phone2,
          email: email2.value,
          accept_terms: accept_terms2.checked,
          receive_information: receive_information2.checked,
        }),
      }).then((response) => {
        console.log(response);
        window.location.href = "../thank-you.html";
      });
      // Simular una función que se ejecuta después de un tiempo
      setTimeout(() => {
        // Re-habilitar el botón después de completar la función
        submitBtn.disabled = false;
      }, 3000); // Ejemplo de 3 segundos de espera
    } else {
      // Si el formulario no es válido, mostrar mensajes de error
      form.reportValidity();
    }
    });
</script>
</section>`;

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

var data = {};
var pisos = [];
fetch(url + "house/" + piso, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    data = JSON.parse(result);
    renderizarGaleria(data);
  })
  .catch((error) => console.error(error));

fetch(url + "houses", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    pisos = JSON.parse(result);
    relatedProjects(pisos);
  })
  .catch((error) => console.error(error));

function relatedProjects(pisos) {
  let relatedProjectsArray = [];
  let relatedProjectsHtml = "";
  var relatedProjectsComplete = "";
  pisos.houses.reverse().forEach(function (piso) {
    if (
      !piso.sold &&
      piso.id != data.house.id
    ) {
      relatedProjectsArray.push(piso);
    }
  });
  var relatedGama = [];
  switch (data.house.gama) {
    case "riviera":
      relatedGama = ["emerald"];
      document.getElementById("li-riv").classList.add("subnav-li-active");
      document.getElementById("mobile-li-riv").style.color = "#bda76f";
      break;
    case "emerald":
      relatedGama = ["grand-emerald", "riviera"];
      document.getElementById("li-eme").classList.add("subnav-li-active");
      document.getElementById("mobile-li-eme").style.color = "#bda76f";
      break;
    case "grand-emerald":
      relatedGama = ["milano", "emerald"];
      document.getElementById("li-gem").classList.add("subnav-li-active");
      document.getElementById("mobile-li-gem").style.color = "#bda76f";
      break;
    case "milano":
      relatedGama = ["palazzo", "grand-emerald"];
      document.getElementById("li-mil").classList.add("subnav-li-active");
      document.getElementById("mobile-li-mil").style.color = "#bda76f";
      break;
    case "palazzo":
      relatedGama = ["milano"];
      document.getElementById("li-pal").classList.add("subnav-li-active");
      document.getElementById("mobile-li-pal").style.color = "#bda76f";
      break;

    default:
      break;
  }
  // pisos.houses.reverse().forEach(function (piso) {
  //   for (let index = 0; index < relatedGama.length; index++) {
  //     if (
  //       piso.gama == relatedGama[index] &&
  //       !piso.sold &&
  //       piso.id != data.house.id
  //     ) {
  //       relatedProjectsArray.push(piso);
  //     }
  //   }
  // });
  var maxHouses = relatedProjectsArray.length;
  pisos.houses.reverse().forEach(function (piso) {
    if (piso.gama == data.house.gama && piso.sold && piso.id != data.house.id && maxHouses < 9) {
      relatedProjectsArray.push(piso);
      maxHouses++;
    }
  });
  console.log("RelatedProjectsArray: "+ relatedProjectsArray);
  for (let i = 0; i < relatedProjectsArray.length; i++) {
    relatedProjectsHtml += `
      <li class="splide__slide">
        <a href="piso.html?id=${
          relatedProjectsArray[i].id
        }" class="galeria-container">
            <div class="galeria-item" style="background-image:url('${
              relatedProjectsArray[i].background
            }');">
            ${
              relatedProjectsArray[i].sold
                ? `<div class="galeria-item-sold roboto-light">VENDIDO</div>`
                : `<div class="galeria-item-on-sale roboto-light">EN VENTA</div>`
            }
                <h3>${relatedProjectsArray[i].name}</h3>
            </div>
        </a>
      </li>
    `;
  }
  relatedProjectsComplete = `
    <div><h2 id="related-projects-title">Proyectos similares</h2></div>
    <div id="related-slider" class="splide">
      <div class="splide__track">
        <ul class="splide__list">
          ${relatedProjectsHtml}
        </ul>
      </div>
    </div>
  `;

  $("#related-projects").html(relatedProjectsComplete);
  initializeRelatedSplide();
}

function renderizarGaleria(data) {
  console.log(data);
  console.log(data.house);
  let photos = data.house.photos.split(",");
  let slider = "";
  //let thumbnails = "";

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  document.title = data.house.name;

  if (data.house.sold) {
    for (let i = 4; i < photos.length; i++) {
      slider += `
      <li class="splide__slide">
          <img class="slider-photo" src="${photos[i]}">
      </li>
      `;
      // thumbnails += `
      // <li class="splide__slide">
      //     <img class="slider-thumbnail-img" src="${photos[i]}">
      // </li>
      // `;
    }
  } else {
    for (let i = 0; i < photos.length; i++) {
      slider += `
      <li class="splide__slide">
          <img class="slider-photo" src="${photos[i]}">
      </li>
      `;
      // thumbnails += `
      // <li class="splide__slide">
      //     <img class="slider-thumbnail-img" src="${photos[i]}">
      // </li>
      // `;
    }
  }

  let splideHTML = `
    <div id="image-slider" class="splide">
      <div class="splide__track">
        <ul class="splide__list">
          ${slider}
        </ul>
        <div class="fullscreen-btn" onclick="toggleFS()">
          <i class='bx bx-fullscreen' style='color:#ffffff'  ></i>
        </div>
        <div id="toggle-autoplay">
          <i class='bx bx-pause-circle' style='color:#ffffff' ></i>
        </div>
      </div>
    </div>
    `;
  // <div id="thumbnail-slider" class="splide">
  //   <div class="splide__track">
  //     <ul class="splide__list">
  //       ${thumbnails}
  //     </ul>
  //   </div>
  // </div>
  let mobile = screen.width <= 768 ? true : false;
  let html = `
    <section id="sale">
        <img src="${data.house.background}" alt="" id="background" />
        <div class="content">
            <div id="content-video-div">${data.house.videoURL}</div>
            <div id="content-text-div">
                <h2>${
                  data.house.type != "apartment"
                    ? data.house.type == "conversion"
                      ? "CONVERSIÓN DE UN LOCAL A VIVIENDA"
                      : "CHATEAU"
                    : "REFORMA INTEGRAL DE UN PISO"
                }</h2>
                <h1>${data.house.name}</h1>
                ${
                  data.house.sold
                    ? "<br>"
                    : `<h3 class="roboto-thin">${formatter.format(
                        data.house.price
                      )}</h3>`
                }
                <p class="roboto-thin" style="text-align: justify;">${
                  data.house.description
                }</p>
            </div>
        </div>
    </section>
    ${
      data.house.sold
        ? mobile
          ? `
          <section id="galeria">
              <div id="img1-div"><img data-aos="fade-up" src="${photos[0]}" alt="img1" id="img1" width="100%" height="100%" /></div>
              <div id="img2-div"><img data-aos="fade-up" src="${photos[1]}" alt="img2" id="img2" width="100%" height="100%" /></div>
              <div id="img3-div"><img data-aos="fade-up" src="${photos[2]}" alt="img3" id="img3" width="100%" height="100%" /></div>
              <div id="img4-div"><img data-aos="fade-up" src="${photos[3]}" alt="img4" id="img4" width="100%" height="100%" /></div>
          </section>
          <section class="slideshow-container">
              ${splideHTML}
          </section>
          <section id="related-projects">

          </section>`
          : `
          <section id="galeria">
              <div id="img1-div"><img data-aos="fade-up" src="${photos[0]}" alt="img1" id="img1" width="100%" height="100%" /></div>
              <div id="img2-div"><img data-aos="fade-right" src="${photos[1]}" alt="img2" id="img2" width="100%" height="100%" /></div>
              <div id="img3-div"><img data-aos="fade-left" src="${photos[2]}" alt="img3" id="img3" width="100%" height="100%" /></div>
              <div id="img4-div"><img data-aos="fade-up" src="${photos[3]}" alt="img4" id="img4" width="100%" height="100%" /></div>
          </section>
          <section class="slideshow-container">
              ${splideHTML}
          </section>
          <section id="related-projects">

          </section>`
        : `
          <br><br>
          <section class="slideshow-container">
              ${splideHTML}
          </section>
          ${contactForm}
          <section id="related-projects">

          </section>
        `
    }
  `;

  $("#main").html(html);
  waitForFirstImagesToLoad(
    document.querySelectorAll("#image-slider img"),
    5,
    initializeSplide
  );
}

function waitForFirstImagesToLoad(images, count, callback) {
  let loadedImages = 0;
  for (let i = 0; i < count && i < images.length; i++) {
    if (images[i].complete) {
      loadedImages++;
      if (loadedImages === count) {
        callback();
      }
    } else {
      images[i].addEventListener("load", () => {
        loadedImages++;
        if (loadedImages === count) {
          callback();
        }
      });
      images[i].addEventListener("error", () => {
        loadedImages++;
        if (loadedImages === count) {
          callback();
        }
      });
    }
  }
  if (loadedImages === count) {
    callback();
  }
}

function toggleFS() {
  var fsBtn = document.getElementsByClassName("fullscreen-btn")[0];
  var elem = document.getElementsByClassName("slideshow-container")[0];
  if (!document.fullscreenElement) {
    fsBtn.innerHTML =
      "<i class='bx bx-exit-fullscreen' style='color:#ffffff' ></i>";
    if (elem.requestFullscreen()) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    } else if (elem.webkitEnterFullscreen) {
      /* Safari */
      elem.webkitEnterFullscreen();
    }
  } else {
    fsBtn.innerHTML =
      "<i class='bx bx-fullscreen' style='color:#ffffff'  ></i>";
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
}

function initializeSplide() {
  var main = new Splide("#image-slider", {
    type: "slide",
    perPage: 1,
    perMove: 1,
    focus: "center",
    pagination: false,
    arrows: true,
    autoWidth: true,
    gap: 20,
    autoplay: true,
    interval: 5000,
    keyboard: true,
  });

  // var thumbnails = new Splide("#thumbnail-slider", {
  //   rewind: true,
  //   autoWidth: true,
  //   isNavigation: true,
  //   gap: 10,
  //   focus: "center",
  //   pagination: false,
  //   arrows: false,
  //   dragMinThreshold: {
  //     mouse: 4,
  //     touch: 10,
  //   },
  // });

  // thumbnails.mount();
  // main.sync(thumbnails);
  main.mount();

  main.on("mounted", function () {
    main.refresh();
  });

  var isAutoplay = true;
  var ap = document.getElementById("toggle-autoplay");

  document
    .getElementById("toggle-autoplay")
    .addEventListener("click", function () {
      if (isAutoplay) {
        ap.innerHTML =
          "<i class='bx bx-play-circle' style='color:#ffffff' ></i>";
        main.options = { autoplay: false };
        main.Components.Autoplay.pause();
      } else {
        ap.innerHTML =
          "<i class='bx bx-pause-circle' style='color:#ffffff' ></i>";
        main.options = { autoplay: true };
        main.Components.Autoplay.play();
      }
      isAutoplay = !isAutoplay;
    });
}

function initializeRelatedSplide() {
  var rel = new Splide("#related-slider", {
    type: "loop",
    perPage: 3,
    perMove: 3,
    height: "400px",
    pagination: false,
    arrows: true,
    cover: true,
    gap: 20,
    breakpoints: {
      768: {
        perPage: 1,
        perMove: 1,
      },
    },
  });

  rel.mount();
}
