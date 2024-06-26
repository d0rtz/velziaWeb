var url = "https://dev.velzia.es:4999/";
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
            <label for="input-photos">Imágenes (puede arrastrarlas para ordenar).</label>
            <input type="file" name="input-photos" id="input-photos" accept="image/png, image/jpeg, image/webp" multiple />
            <div id="sortable" style="display:flex; flex-wrap:wrap;"></div>
            <input type="hidden" id="sorted-photos" name="sorted-photos">
        </section>
        <section>
            <label for="input-zone">Zona (En minusculas)</label>
            <input type="text" name="input-zone" id="input-zone">
        </section>
        <section>
            <button value="delete-btn" id="delete-button">Eliminar</button>
            <button type="submit" value="create-btn" id="create-btn">Publicar</button>
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
      pisos.houses.reverse().forEach(function (piso) {
        list += `<div class="piso-li"><div onclick=houseDetail(${
          piso.id
        })><h3>${piso.name}</h3><img src="${
          piso.background.includes("./")
            ? "." + piso.background
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
          .attr("src", "." + piso.background)
          .show();
      }

      // Mostrar imágenes adicionales si existen
      if (piso.photos) {
        const photos = piso.photos.split(",");
        let photoHtml = "";
        photos.forEach((photo, index) => {
          photoHtml += `<li data-id="${index}" class="ui-state-default"><img src=".${photo}" width="100px" height="60px"/><img src="../resources/x.png" width="10px" height="10px" style="margin-left:5px;margin-bottom: 50px;" class="delete-btn"/> </li>`;
        });
        $("#sortable").html(photoHtml).show();
        initializeSortable(); // Inicializar sortable después de cargar las imágenes
      }

      $("#create-btn").html("Guardar cambios").attr("id", "edit-btn");

      // Event listener para el botón de eliminar
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", function () {
          const itemId = this.closest("li").getAttribute("data-id");
          eliminarImagen(itemId);
        });
      });

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

async function enviarDatosRestantes(id) {
  const bg = document.getElementById("input-background").files[0];
  const files = document.getElementById("input-photos").files;

  // Obtener las imágenes desde el contenedor sortable
  const sortableItems = document.querySelectorAll("#sortable li");
  const sortedFiles = Array.from(sortableItems).map((item) => {
    const fileIndex = item.getAttribute("data-id");
    return files[fileIndex] || item.querySelector("img").src;
  });

  console.log("sortedFiles:", sortedFiles);

  const formData = new FormData();
  if (bg) {
    formData.append("input-background", bg);
  }

  if (typeof sortedFiles[0] === 'string' && sortedFiles[0].startsWith("http")) {
    let files3 = await convertUrlsToFiles(sortedFiles)
    formData.append("input-photos", files3);
  } else {
    sortedFiles.forEach(file => {
      formData.append("input-photos", file);
    })
  }

  formData.append("id", id);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  fetch(url + "new-house-images", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      pisosWindow();
    })
    .catch((err) => console.error("Error occurred", err));
}

async function editarDatosRestantes(id) {
  const bg = document.getElementById("input-background").files[0];
  const files = document.getElementById("input-photos").files;

  // Obtener las imágenes desde el contenedor sortable
  const sortableItems = document.querySelectorAll("#sortable li");
  const sortedFiles = Array.from(sortableItems).map((item) => {
    const fileIndex = item.getAttribute("data-id");
    return files[fileIndex] || item.querySelector("img").src;
  });

  console.log("sortedFiles:", sortedFiles);

  const formData = new FormData();
  if (bg) {
    formData.append("input-background", bg);
  }

  if (typeof sortedFiles[0] === 'string' && sortedFiles[0].startsWith("http")) {
    let files3 = await convertUrlsToFiles(sortedFiles)
    formData.append("input-photos", files3);
  } else {
    sortedFiles.forEach(file => {
      formData.append("input-photos", file);
    })
  }

  formData.append("id", id);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  fetch(url + "house-images/" + id, {
    method: "PATCH",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
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

  const infoJSON = {
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
      editarDatosRestantes(id); // Siempre actualizamos el orden de las imágenes
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
  initializeSortable(); // Inicializar sortable al crear una nueva casa
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

function initializeSortable() {
  $("#sortable")
    .sortable({
      update: function (event, ui) {
        var sortedIDs = $("#sortable").sortable("toArray", {
          attribute: "data-id",
        });
        console.log("Nuevo orden: ", sortedIDs);
        document.getElementById("sorted-photos").value = sortedIDs.join(",");
      },
    })
    .disableSelection();
}

// Delegación de eventos para manejar dinámicamente el input de archivos
document.addEventListener("change", function (event) {
  if (event.target && event.target.id === "input-photos") {
    const files = event.target.files;
    const sortableList = document.getElementById("sortable");
    sortableList.innerHTML = ""; // Limpiar cualquier contenido anterior

    // Crear un array para almacenar los archivos seleccionados en el orden correcto
    const selectedFiles = Array.from(files);

    selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const li = document.createElement("li");
        li.className = "ui-state-default";
        li.setAttribute("data-id", index);
        li.style.margin = "5px";
        li.innerHTML = `<img src="${e.target.result}" width="100px" height="60px"/><img src="../resources/x.png" width="10px" height="10px" style="margin-left:5px;margin-bottom: 50px;" class="delete-btn"/>`;
        sortableList.appendChild(li);
        document.querySelectorAll(".delete-btn").forEach((button) => {
          button.addEventListener("click", function () {
            const itemId = this.closest("li").getAttribute("data-id");
            eliminarImagen(itemId);
          });
        });
      };
      reader.readAsDataURL(file);
    });

    // Inicializar sortable
    $("#sortable")
      .sortable({
        update: function (event, ui) {
          var sortedIDs = $("#sortable").sortable("toArray", {
            attribute: "data-id",
          });
          console.log("Nuevo orden: ", sortedIDs);
          document.getElementById("sorted-photos").value = sortedIDs.join(",");
        },
      })
      .disableSelection();

    // Almacenar el array de archivos en el input de tipo hidden
    document.getElementById("sorted-photos").value = selectedFiles
      .map((_, i) => i)
      .join(",");
  }
});

function eliminarImagen(itemId) {
  const item = document.querySelector(`#sortable li[data-id='${itemId}']`);
  if (item) {
    item.remove();
  }
}

async function urlToFile(url) {
  const response = await fetch(url);
  const data = await response.blob();
  const mimeType = data.type;

  // Deriva la extensión del archivo desde el MIME type
  let extension = "";
  switch (mimeType) {
    case "image/jpeg":
      extension = ".jpg";
      break;
    case "image/png":
      extension = ".png";
      break;
    case "image/webp":
      extension = ".webp";
      break;
    default:
      throw new Error("Unsupported image type");
  }

  // Deriva el nombre del archivo desde la URL
  const filename = url.split("/").pop().split("?")[0] + extension;
  return new File([data], filename, { type: mimeType });
}

async function convertUrlsToFiles(urls) {
  const files = [];
  for (let i = 0; i < urls.length; i++) {
    const file = await urlToFile(urls[i]);
    files.push(file);
  }
  return files;
}
