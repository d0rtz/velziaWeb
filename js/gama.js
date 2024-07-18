var gama = params.get("gama");

var url = "https://dev.velzia.es:4999/gama/" + gama;

const requestOptions = {
  method: "GET",
  redirect: "follow",
};
var pisos = [];
fetch(url, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    pisos = JSON.parse(result);
    function renderizarGaleria(pisos) {
      console.log(pisos);
      console.log(pisos.gama);
      let html = "";
      let htmlTitle = "";
      switch (gama) {
        case "riviera":
            htmlTitle = "<h1>RIVIERA</h1><h4>Lujo a precio asequible</h4>";
            document.getElementById("li-riv").classList.add("subnav-li-active");
            break;
        case "emerald":
            htmlTitle = "<h1>EMERALD</h1><h4>El equilibrio perfecto entre elegancia y funcionalidad</h4>";
            document.getElementById("li-eme").classList.add("subnav-li-active");
            break;
        case "grand-emerald":
            htmlTitle = "<h1>GRAND EMERALD</h1><h4>Máximo confort, sofisticación y diseño</h4>";
            document.getElementById("li-gem").classList.add("subnav-li-active");
            break;
        case "milano":
            htmlTitle = "<h1>MILANO</h1><h4>Modernidad y alta decoración en perfecta armonía</h4>";
            document.getElementById("li-mil").classList.add("subnav-li-active");
            break;
        case "palazzo":
            htmlTitle = "<h1>PALAZZO</h1><h4>El más exquisito lujo contemporáneo en los barrios más exclusivos de Madrid​</h4>";
            document.getElementById("li-pal").classList.add("subnav-li-active");
            break;
      
        default:
        break;
      }
      $("#title").html(htmlTitle);
    
      pisos.houses.reverse().forEach(function (piso) {
        html += `
            <a href="piso.html?id=${piso.id}" class="galeria-container">
                <div class="galeria-item" style="background-image:url('${
                  piso.background
                }');">
                ${
                  piso.sold
                    ? `<div class="galeria-item-sold roboto-light">VENDIDO</div>`
                    : `<div class="galeria-item-on-sale roboto-light">EN VENTA</div>`
                }
                    <h3>${piso.name}</h3>
                </div>
            </a>
          `;
      });
    
      $("#galeria").html(html);
    }
    
    $(function () {
      renderizarGaleria(pisos);
    });
  })
  .catch((error) => console.error(error));


