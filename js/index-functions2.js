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
      let html2 = "";
      let htmlComplete = "";
      let htmlComplete2 = "";
      let i = 0;

      pisos.houses.reverse().forEach(function (piso) {
        if (!piso.sold) {
          html += `
            <li class="splide__slide">
              <a href="piso.html?id=${
                piso.id
              }" class="galeria-container">
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
            </li>
          `;
        }else{
          if(i<9){
            html2 += `
            <li class="splide__slide">
              <a href="piso.html?id=${
                piso.id
              }" class="galeria-container">
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
            </li>
          `;
          i++;
          }
          
        }
      });
      htmlComplete = `
        <div><h2 id="on-sale-title">Casas Velzia en venta</h2></div>
        <div id="on-sale-slider" class="splide">
          <div class="splide__track">
            <ul class="splide__list">
              ${html}
            </ul>
          </div>
        </div>
      `;
      htmlComplete2 = `
        <div><h2 id="sold-title">Otras casas Velzia</h2></div>
        <div id="sold-slider" class="splide">
          <div class="splide__track">
            <ul class="splide__list">
              ${html2}
            </ul>
          </div>
        </div>
      `;

      $("#on-sale").html(htmlComplete);
      initializeOnSaleSplide();
      $("#sold").html(htmlComplete2);
      initializeSoldSplide();
    }

    $(function () {
      renderizarGaleria(pisos);
    });
  })
  .catch((error) => console.error(error));

function initializeOnSaleSplide() {
  console.log("On Sale Slide Log");
  var onSale = new Splide("#on-sale-slider", {
    type: "loop",
    perPage: 3,
    perMove: 1,
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

  onSale.mount();
}
function initializeSoldSplide() {
  console.log("Sold Slide Log");
  var sold = new Splide("#sold-slider", {
    type: "loop",
    perPage: 3,
    perMove: 1,
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

  sold.mount();
}