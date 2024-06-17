var url = "https://79.137.45.155:4999/";
var modal = document.getElementById("myModal");
var span = document.getElementById("modal-close");

var houseForm = `
    <div id="new-house-form-div">
    <h2 id="form-title"></h2>
    <form id="new-house-form">
        <section>
            <label for="input-name">Nombre o dirección.*</label>
            <input type="text" name="input-name" id="input-name">
        </section>
        <section>
            <label for="input-gama">Gama.*</label>
            <select name="input-gama" id="input-gama">
                <option value=""></option>
                <option value="riviera">Riviera</option>
                <option value="emerald">Emerald</option>
                <option value="grand-emerald">Grand Emerald</option>
                <option value="milano">Milano</option>
                <option value="palazzo">Palazzo</option>
            </select>
        </section>
        <section>
            <label for="input-background">Imagen Principal.</label>
            <input type="file" name="input-background" id="input-background" accept="image/png, image/jpeg, image/webp">
            <img id="current-background" style="display:none;" width="100px" height="60px"/>
        </section>
        <section>
            <label for="input-sold">Marca si está vendido.</label>
            <input type="checkbox" name="input-sold" id="input-sold">
        </section>
        <section>
            <label for="input-price">Precio.*</label>
            <input type="number" name="input-price" id="input-price">
        </section>
        <section>
            <label for="input-video">Iframe de Youtube o Matterport</label>
            <textarea name="input-video" id="input-video" cols="30" rows="8"></textarea>
        </section>
        <section>
            <label for="input-description">Descripción.*</label>
            <textarea name="input-description" id="input-description" cols="30" rows="8"></textarea>
        </section>
        <section>
            <label for="input-type">Tipo de obra</label>
            <select name="input-type" id="input-type">
                <option value=""></option>
                <option value="apartment">Reforma integral de un piso</option>
                <option value="house">Chateau</option>
            </select>
        </section>
        <section>
            <label for="input-photos">Imagenes, (primera seleccionada sera la primera en mostrarse).</label>
            <input type="file" name="input-photos" id="input-photos" accept="image/png, image/jpeg, image/webp" multiple />
            <div id="current-photos" style="display:none;"></div>
        </section>
        <section>
            <label for="input-zone">Zona (En minusculas)</label>
            <input type="text" name="input-zone" id="input-zone">
        </section>
        <section>
            <button value="delete-btn" id="delete-button">Eliminar</button>
            <button type="submit" value="create-btn" id="create-btn">Crear</button>
        </section>
    </form>
    </div>
`;

function homeWindow() {
  var html = `<h1>Work in progress</h1>`;
  $("#home-content").html(html);
}

function gamasWindow() {
  var html = `<h1>Work in progress</h1>`;
  $("#home-content").html(html);
}
function analiticasWindow() {
  var html = `<h1>Work in progress</h1>`;
  $("#home-content").html(html);
}

function ajustesWindow() {
  var html = `<h1>Work in progress</h1>`;
  $("#home-content").html(html);
}

function pisosWindow() {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(url + "houses", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      var pisos = JSON.parse(result);
      var list = ``;
      pisos.houses.forEach(function (piso) {
        list += `<div class="piso-li" ><div onclick=houseDetail(${
          piso.id
        })><h3>${piso.name}</h3><img src="${
          piso.background.includes("../")
            ? "../" + piso.background
            : piso.background
        }" width="100px" height="60px"/></div><i class='bx bx-trash' onclick=deleteModal(${
          piso.id
        })></i></div>`;
      });
      var html = `
            <div id="options-bar">
                <h1>PISOS</h1>
                <button id="add-btn" onclick=newHouse()>Añadir</button>
            </div>
            <div id="pisos-div">
                ${list}
            </div>
            `;
      $("#home-content").html(html);
    })
    .catch((error) => console.error(error));
}

function create() {
  console.log("New House Form clicked");
  const name = document.getElementById("input-name");
  const gama = document.getElementById("input-gama");
  const sold = document.getElementById("input-sold");
  const price = document.getElementById("input-price");
  const video = document.getElementById("input-video");
  const description = document.getElementById("input-description");
  const type = document.getElementById("input-type");
  const zone = document.getElementById("input-zone");
  if (
    name.value != "" &&
    gama.value != "" &&
    description.value != "" &&
    price.value != ""
  ) {
    var infoJSON = {
      name: name.value,
      gama: gama.value,
      sold: sold.checked,
      price: price.value,
      video: video.value,
      description: description.value,
      type: type.value,
      zone: zone.value,
    };
    fetch(url + "new-house", {
      method: "POST",
      body: JSON.stringify(infoJSON),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Primeros datos enviados ", data);
        enviarDatosRestantes(data.id);
      })
      .catch((err) => console.error("Error occurred", err));
  } else {
    alert("No se ha podido crear el piso. Motivo: Campos en blanco");
    pisosWindow();
  }
}
function houseDetail(id) {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(url + "house/" + id, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      var piso = result.house;
      console.log(piso);
      $("#home-content").html(houseForm);
      let formTitle = `Editar piso "${piso.name}"`;
      $("#form-title").html(formTitle);
      $("#input-name").val(piso.name);
      $("#input-gama").val(piso.gama);
      if (piso.sold == 1) {
        $("#input-sold").prop("checked", true);
      }
      $("#input-price").val(piso.price);
      $("#input-video").val(piso.videoURL);
      $("#input-description").val(piso.description);
      $("#input-type").val(piso.type);
      $("#input-zone").val(piso.zone);

      // Mostrar imagen principal si existe
      if (piso.background) {
        $("#current-background")
          .attr("src", "/uploads/" + piso.background.replace(/\\/g, "/"))
          .show();
      }

      // Mostrar imágenes adicionales si existen
      if (piso.photos) {
        const photos = piso.photos.split(",");
        let photoHtml = "";
        photos.forEach((photo) => {
          photoHtml += `<img src="/uploads/${photo.replace(
            /\\/g,
            "/"
          )}" width="100px" height="60px"/>`;
        });
        $("#current-photos").html(photoHtml).show();
      }

      $("#create-btn").html("Editar");
      $("#create-btn").attr("id", "edit-btn");

      // Asignar evento submit al botón de edición
      $("#edit-btn").on("click", function (event) {
        event.preventDefault();
        editHouse(id);
      });
      $("#delete-button").on("click", function (event) {
        event.preventDefault();
        deleteModal(id);
      });
    })
    .catch((error) => console.error(error));
}

function enviarDatosRestantes(id) {
  const bg = document.getElementById("input-background");
  const files = document.getElementById("input-photos");
  const formData = new FormData();
  formData.append("input-background", bg.files[0]);
  for (let i = 0; i < files.files.length; i++) {
    formData.append("input-photos", files.files[i]);
  }
  formData.append("id", id);
  console.log(
    "Enviando imagenes " + bg.files[0] + " y las otras " + files.files[0]
  );
  fetch(url + "new-house-images", {
    method: "POST",
    body: formData,
    // NO SET CONTENT-TYPE HEADER HERE
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Success ", data);
      pisosWindow();
    })
    .catch((err) => console.error("Error occurred", err));
}
function editarDatosRestantes(id) {
  const bg = document.getElementById("input-background");
  const files = document.getElementById("input-photos");
  const formData = new FormData();
  formData.append("input-background", bg.files[0]);
  for (let i = 0; i < files.files.length; i++) {
    formData.append("input-photos", files.files[i]);
  }
  formData.append("id", id);
  console.log(
    "Enviando imagenes " + bg.files[0] + " y las otras " + files.files[0]
  );
  fetch(url + "house-images/" + id, {
    method: "PATCH",
    body: formData,
    // NO SET CONTENT-TYPE HEADER HERE
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Success ", data);
      pisosWindow();
    })
    .catch((err) => console.error("Error occurred", err));
}
function editHouse(id) {
  const name = document.getElementById("input-name");
  const gama = document.getElementById("input-gama");
  const sold = document.getElementById("input-sold");
  const price = document.getElementById("input-price");
  const video = document.getElementById("input-video");
  const description = document.getElementById("input-description");
  const type = document.getElementById("input-type");
  const zone = document.getElementById("input-zone");
  const bg = document.getElementById("input-background");
  const files = document.getElementById("input-photos");

  var infoJSON = {
    name: name.value,
    gama: gama.value,
    sold: sold.checked,
    price: price.value,
    video: video.value,
    description: description.value,
    type: type.value,
    zone: zone.value,
  };

  fetch(url + "house/" + id, {
    method: "PATCH",
    body: JSON.stringify(infoJSON),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Datos actualizados ", data);

      // Enviar archivos si hay
      if (bg.files.length > 0 || files.files.length > 0) {
        editarDatosRestantes(id);
      } else {
        pisosWindow();
      }
    })
    .catch((err) => console.error("Error occurred", err));
}

function deleteHouse(id) {
  let requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  fetch(url + "house/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var res = JSON.parse(result);
      if (res.message == "deleted") {
        modal.style.display = "none";
        pisosWindow();
      } else {
        var html = ``;
        html = `<p id="modal-text">HA OCURRIDO UN ERROR</p>`;
        $("#modal-text-div").html(html);
      }
    })
    .catch((error) => console.error(error));
}

function newHouse() {
  $("#home-content").html(houseForm);
  let formTitle = `Añadir nuevo piso`;
  $("#form-title").html(formTitle);
  $("#create-btn").html("Crear");
  document
    .getElementById("new-house-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      create();
    });
}

function deleteModal(id) {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(url + "house/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      var piso = JSON.parse(result);
      console.log(piso);
      var html = `<p id="modal-text">¿DESEA ELIMINAR EL PISO "${piso.house.name}"?</p>
        <div id="modal-buttons">
            <button id="modal-accept" onclick=deleteHouse(${piso.house.id})>ELIMINAR</button>
        </div>`;
      $("#modal-text-div").html(html);
      modal.style.display = "block";
    })
    .catch((error) => console.error(error));
}

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
