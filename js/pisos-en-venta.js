initMultiStepForm();

function initMultiStepForm() {
    const progressNumber = document.querySelectorAll(".step").length;
    const slidePage = document.querySelector(".slide-page");
    const submitBtn = document.querySelector(".submit");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const stepsNumber = pages.length;

    if (progressNumber !== stepsNumber) {
        console.warn(
            "Error, number of steps in progress bar do not match number of pages"
        );
    }

    document.documentElement.style.setProperty("--stepNumber", stepsNumber);

    let current = 1;

    for (let i = 0; i < nextButtons.length; i++) {
        nextButtons[i].addEventListener("click", function (event) {
            event.preventDefault();

            inputsValid = validateInputs(this);
            // inputsValid = true;

            if (inputsValid) {
                slidePage.style.marginLeft = `-${
                    (100 / stepsNumber) * current
                }%`;
                //bullet[current - 1].classList.add("active");
                //progressCheck[current - 1].classList.add("active");
                //progressText[current - 1].classList.add("active");
                current += 1;
            }
        });
    }

    for (let i = 0; i < prevButtons.length; i++) {
        prevButtons[i].addEventListener("click", function (event) {
            event.preventDefault();
            slidePage.style.marginLeft = `-${
                (100 / stepsNumber) * (current - 2)
            }%`;
            bullet[current - 2].classList.remove("active");
            progressCheck[current - 2].classList.remove("active");
            progressText[current - 2].classList.remove("active");
            current -= 1;
        });
    }
    submitBtn.addEventListener("click", function () {
        event.preventDefault();
        let fechaActual = new Date();
        let dia = fechaActual.getDate();
        let mes = fechaActual.getMonth() + 1;
        let anio = fechaActual.getFullYear();
        let horas = fechaActual.getHours();
        let minutos = fechaActual.getMinutes();
        let segundos = fechaActual.getSeconds();
        let fechaYHoraFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
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
        let budget2 = document.getElementById("budget");
        let zona = document.getElementById("zone");
        let area2 = document.getElementById("area");
        let first_name = document.getElementById("first_name");
        let last_name = document.getElementById("last_name");
        let full_name2 = first_name.value + " " + last_name.value;
        let phone2 = document.getElementById("phone");
        fetch('https://sig-api.chapnikandgiesen.com/api/leads/form', {
            method: 'POST',
            body: new URLSearchParams({
              date: fechaYHoraFormateada,
              utm_source: utm_source2,
              utm_medium: utm_medium2,
              utm_campaign: utm_campaign2,
              utm_term: utm_term2,
              utm_content: utm_content2,
              formTitle: window.location.search,
              budget: budget2.value,
              zone: zona.value,
              area: area2.value,
              full_name: full_name2,
              phone: phone2.value
            })
          })
            .then(response => {
                console.log(response);
                window.location.href = "../thank-you.html";
        });
    });

    function validateInputs(ths) {
        let inputsValid = true;

        const inputs =
            ths.parentElement.parentElement.querySelectorAll("input");
        for (let i = 0; i < inputs.length; i++) {
            const valid = inputs[i].checkValidity();
            if (!valid) {
                inputsValid = false;
                inputs[i].classList.add("invalid-input");
            } else {
                inputs[i].classList.remove("invalid-input");
            }
        }
        return inputsValid;
    }
}

const contactBtn = document.getElementById("contact-button");
const formStartDiv = document.getElementById("form-start-div");
const container = document.getElementsByClassName("container")[0];

contactBtn.addEventListener("click", () => {
    formStartDiv.style.maxWidth = "0px";
    formStartDiv.style.visibility = "hidden";
    formStartDiv.style.opacity = "0";
    container.style.maxWidth = "1000px";
    container.style.visibility = "visible";
    container.style.opacity = "1";
    container.style.padding = "0px 35px 10px 35px";
});
