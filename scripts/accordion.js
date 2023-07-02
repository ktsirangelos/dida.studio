import { projects } from "../projects-data/projects.js";

// ACCORDION LIST

// Bindings

const accordionList = document.querySelector(".accordion");
const filterItems = document.querySelectorAll(".filter-items button");

// Event listeners

filterItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const filterValue = event.target.id;
    filterValue === "all"
      ? renderProjects(projects)
      : filterProjects(filterValue);
  });
});

// Functions

const filterProjects = (filterValue) => {
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.filter === filterValue && b.filter !== filterValue) {
      return -1;
    } else if (a.filter !== filterValue && b.filter === filterValue) {
      return 1;
    } else {
      return 0;
    }
  });
  renderProjects(sortedProjects, filterValue);
};

const renderProjects = (projectArray, filterValue) => {
  accordionList.innerHTML = "";

  projectArray.forEach((projectObject) => {
    const formatedCode = projectObject.code.toString().split("").join(".");

    const disableButton =
      filterValue &&
      filterValue !== "all" &&
      filterValue !== projectObject.filter;

    const buttonClass = disableButton
      ? "accordion-button disabled"
      : "accordion-button";

    accordionList.innerHTML += `
      <div class="accordion-item">
        <button class="${buttonClass}">
          <div class="accordion-button-title">${formatedCode} &nbsp; ${projectObject.title}
          </div>
          <div class="accordion-button-type">${projectObject.type}</div>
          <div class="accordion-button-year">${projectObject.year}</div>
        </button>
        <div class="accordion-content">
          <div class="accordion-content-pictures-1">
            <a href="${projectObject.projectUrl}">
              <img src="${projectObject.picUrl1}" alt="${projectObject.title}" />
            </a>
          </div>
          <div class="accordion-content-pictures-2">
            <a href="${projectObject.projectUrl}">
              <img src="${projectObject.picUrl2}" alt="${projectObject.title}" />
            </a>
          </div>
          <div class="accordion-content-text">
            <p class="template">Location:</p>
            <p>${projectObject.location}</p>
            <p class="template">Creative Direction:</p>
            <p>${projectObject.direction}</p>
            <p class="template">Description:</p>
            <p>
              ${projectObject.description}
            </p>
            <a href="${projectObject.projectUrl}">explore</a>
          </div>
        </div>
      </div>
    `;
  });

  // ACCORDION ITEMS

  // Functions

  const openItem = (clickedItem) => {
    document.querySelectorAll(".accordion-item").forEach((otherItem) => {
      if (otherItem !== clickedItem) {
        otherItem
          .querySelector(".accordion-content")
          .classList.remove("active");
      }
    });
  };

  // Event listeners

  document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", () => {
      const accordionItem = button.parentElement;
      const content = button.nextElementSibling;
      openItem(accordionItem);
      content.classList.toggle("active");
    });
  });
};

// Init

renderProjects(projects);
