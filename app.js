import brochures from "./brochures.js";

//Get data from brochures.js and render the brochures content
document.addEventListener("DOMContentLoaded", function () {
  const brochureContainer = document.getElementById("brochures-container");
  //For each value that comes from brochures.js render HTML
  brochureContainer.innerHTML = brochures
    .map(
      (brochure, index) => `
          <div class="card" data-brochure-id="${index}">
            <img src="img/${brochure.image}" alt="" />
            <div class="title">${brochure.title}</div>
          </div>
      `
    )
    .join("");
  handleModal();
});

//Filter function: add event listener to Select tag and check if value exists in the brochures tags array
const filterSelect = document.getElementById("filter");

filterSelect.addEventListener("change", function (e) {
  const brochureContainer = document.getElementById("brochures-container"); //Get the container into a variable
  const selectedTag = e.target.value; //Save the selected filter value into a variable
  brochureContainer.innerHTML = brochures //Change the container HTML, for each value that comes from brochures.js check if it includes the selected value in the tags field and render HTML
    .map((brochure, index) => {
      if (brochure.tags.includes(selectedTag)) {
        return `
          <div class="card" data-brochure-id="${index}">
            <img src="img/${brochure.image}" alt="" />
            <div class="title">${brochure.title}</div>
          </div>
      `;
      }
    })
    .join("");
  handleModal();
});

//Modal
function handleModal() {
  const brochureCards = document.querySelectorAll(".card");

  brochureCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Find the corresponding brochure object based on the clicked card's unique identifier
      const brochureId = card.dataset.brochureId;
      const selectedBrochure = brochures[brochureId];

      // Render the PDF corresponding to the selected brochure
      if (selectedBrochure.embed != "") {
        document.querySelector(
          "#modal-pdf"
        ).innerHTML = `<iframe src="${selectedBrochure.embed}"></iframe>`;
      } else {
        document.querySelector(
          "#modal-pdf"
        ).innerHTML = `<object class="pdf" data="./pdf/${selectedBrochure.pdf}"></object>`;
      }

      // Show the modal
      const modal = document.getElementById("modal");
      modal.classList.add("visible");
    });
  });

  const closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", function () {
    const modal = document.getElementById("modal");
    modal.classList.remove("visible");
  });
}
