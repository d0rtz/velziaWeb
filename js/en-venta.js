var url = "https://velzia.es:4999/houses";

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
      let htmlTitle = "<h1>Descubre nuestras casas en venta</h1>";
      $("#title").html(htmlTitle);
    
      pisos.houses.reverse().forEach(function (piso) {
        if(!piso.sold){
            html += `
            <a href="../piso.html?id=${piso.id}" class="galeria-container">
                <div class="galeria-item" style="background-image:url('${
                  "."+piso.background
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
        }
        
      });
    
      $("#galeria").html(html);
    }
    
    $(function () {
      renderizarGaleria(pisos);
    });
  })
  .catch((error) => console.error(error));


