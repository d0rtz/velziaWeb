// recuperamos el querystring
const querystring = window.location.search;
console.log(querystring); // '?q=pisos+en+barcelona&ciudad=Barcelona'

// usando el querystring, creamos un objeto del tipo URLSearchParams
const params = new URLSearchParams(querystring);
var zona = params.get("zona");

var url = "https://velzia.es:4999/zone/" + zona;

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
      console.log(pisos.zona);
      let html = "";
      let htmlTitle = `<h1>${zona.toUpperCase()}</h1>`;

      $("#title").html(htmlTitle);

      pisos.zona.forEach(function (piso) {
        html += `${
          piso.sold
            ? ``
            : `<a href="piso.html?id=${piso.id}" class="galeria-container">
                  <div class="galeria-item" style="background-image:url('${
                    piso.background
                  }');">
                  ${
                    piso.sold
                      ? `<div class="galeria-item-sold">Vendido</div>`
                      : `<div class="galeria-item-on-sale">En venta</div>`
                  }
                      <h3>${piso.name}</h3>
                  </div>
              </a>`
        }`;
      });

      $("#galeria").html(html);
    }

    $(function () {
      renderizarGaleria(pisos);
    });
  })
  .catch((error) => console.error(error));
