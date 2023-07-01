import { projects } from "../projects-data/projects.js";

// Accordion DOM reference
const accordion = document.querySelector(".accordion");

// Initial render of projects
renderProjects(projects);

// Filter items click event listener
const filterItems = document.querySelectorAll(".filter-items a");

filterItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const filterValue = event.target.id;
    if (filterValue === "all") {
      renderProjects(projects); // If 'all', render original projects array
    } else {
      filterProjects(filterValue); // Otherwise, filter and render
    }
  });
});

function filterProjects(filterValue) {
  // Clone and sort projects based on filter
  const sortedProjects = [...projects].sort((a, b) => {
    return a.filter === filterValue ? -1 : 1;
  });

  // Render sorted projects
  renderProjects(sortedProjects, filterValue); // pass filterValue here
}

function renderProjects(projectArray, filterValue) {
  // Clear current accordion content
  accordion.innerHTML = "";

  // Render accordion with provided project array
  projectArray.forEach((projectObject) => {
    const disableButton =
      filterValue &&
      filterValue !== "all" &&
      filterValue !== projectObject.filter;
    const buttonClass = disableButton
      ? "accordion-button disabled"
      : "accordion-button";
    accordion.innerHTML += `
      <div class="accordion-item">
        <button class="${buttonClass}">
          <div class="accordion-button-title">
            ${projectObject.title}
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

  // Refresh accordion button event listeners
  document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", () => {
      const accordionItem = button.parentElement;
      const content = button.nextElementSibling;

      // Close all other accordion items
      document
        .querySelectorAll(".accordion-item")
        .forEach((otherAccordionItem) => {
          if (otherAccordionItem !== accordionItem) {
            otherAccordionItem
              .querySelector(".accordion-button")
              .classList.remove("active");
            otherAccordionItem.querySelector(
              ".accordion-content"
            ).style.maxHeight = null;
          }
        });

      // Toggle the clicked accordion item
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        button.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}
