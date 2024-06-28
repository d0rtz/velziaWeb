var piso = params.get("id");
var url = "https://dev.velzia.es:4999/house/" + piso;
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
                <p class="roboto-regular">Nombre *</p>
                <input id="name" type="text" name="full_name" required/>
                </div>
                <div id="form-tel">
                <p class="roboto-regular">Teléfono *</p>
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    onblur="process(event)"
                    required
                />
                <div
                    class="alert alert-error roboto-regular"
                    style="display: none"
                ></div>
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

  function process(event) {
    event.preventDefault();

    const phoneNumber = phoneInput.getNumber();
    if (!phoneInput.isValidNumber()) {
      error.style.display = "";
      error.innerHTML = "Número inválido.";
    } else {
      error.style.display = "none";
    }
  }
   const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener("click", function () {
      event.preventDefault();
      let name = document.getElementById("name");
      let phone2 = document.getElementById("phone");
      let accept_terms2 = document.getElementById("privacy-checkbox");
      let receive_information2 = document.getElementById("ad-checkbox");
      fetch("https://sig-api.chapnikandgiesen.com/api/leads/form", {
        method: "POST",
        body: new URLSearchParams({
          formTitle: window.location.search,
          full_name: name.value,
          phone: phone2.value,
          accept_terms: accept_terms2.checked,
          receive_information: receive_information2.checked,
        }),
      }).then((response) => {
        console.log(response);
        window.location.href = "../thank-you.html";
      });
    });
</script>
</section>`;
var slideIndex = 1;
const requestOptions = {
  method: "GET",
  redirect: "follow",
};
var data = {};
fetch(url, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    data = JSON.parse(result);
    function renderizarGaleria(data) {
      console.log(data);
      console.log(data.house);
      let photos = data.house.photos.split(",");
      let slider = "";
      // Create our number formatter.
      const formatter = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      document.title = data.house.name;
      if(data.house.sold){
        for (let i = 4; i < photos.length; i++) {
          slider += `
          <div class="mySlides fade">
              <div class="numbertext">${i - 3} / ${photos.length - 4}</div>
              <img src="${photos[i]}">
          </div>
          `;
        }
      }else{
        for (let i = 0; i < photos.length; i++) {
          slider += `
          <div class="mySlides fade">
              <div class="numbertext">${i + 1} / ${photos.length}</div>
              <img src="${photos[i]}">
          </div>
          `;
        }
      }
      
      slider += `
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>
        `;
      let html = `
                <section id="sale">
                    <img
                        src="${data.house.background}"
                        alt=""
                        id="background"
                    />
                    <div class="content">
                        <div id="content-video-div">
                            ${data.house.videoURL}
                        </div>
                        <div id="content-text-div">
                            <h3>${data.house.type != "apartment"?data.house.type:"REFORMA INTEGRAL DE UN PISO"}</h3>
                            <h2>${data.house.name}</h2>
                            ${
                              data.house.sold
                                ? "<br>"
                                : `<h4 class="roboto-thin">${formatter.format(
                                    data.house.price
                                  )}</h4>`
                            }
                            <p class="roboto-thin">${data.house.description}</p>
                        </div>
                    </div>
                </section>
                ${
                  data.house.sold
                    ? ` <section id="galeria">
                            <div id="img1-div" ><img data-aos="fade-up" src="${photos[0]}" alt="img1" id="img1" width="100%" height="100%" /></div>
                            <div id="img2-div"><img data-aos="fade-right" src="${photos[1]}" alt="img2" id="img2" width="100%" height="100%" /></div>
                            <div id="img3-div"><img data-aos="fade-left" src="${photos[2]}" alt="img3" id="img3" width="100%" height="100%" /></div>
                            <div id="img4-div"><img data-aos="fade-up" src="${photos[3]}" alt="img4" id="img4" width="100%" height="100%" /></div>
                        </section>
                        <section class="slideshow-container">
                            ${slider}
                        </section>`
                    : ` <br><br>
                        <section class="slideshow-container">
                            ${slider}
                        </section>
                        ${contactForm}
                        `
                }
                `;
      $("#main").html(html);

      showSlides(slideIndex);
    }
    
   

    $(function () {
      renderizarGaleria(data);
    });
  })
  .catch((error) => console.error(error));

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}
