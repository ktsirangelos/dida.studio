import { projects } from "../data/projects.js";

// Accordion list

// Bindings
const accordionList = document.querySelector(".accordion-list");
const filterItems = document.querySelectorAll(".filter-items button");
let hasRendered = false;

// Event listeners
filterItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const filterValue = event.target.id;
    filterProjects(filterValue);
  });
});

accordionList.addEventListener("click", (event) => {
  const button = event.target.closest(".accordion-button");
  if (button) {
    const accordionItem = button.parentElement;
    const content = button.nextElementSibling;
    openItem(accordionItem);
    content.classList.toggle("active");
  }
});

// Functions
const determineButtonClass = (filterValue, projectObject) => {
  if (
    filterValue &&
    filterValue !== "all" &&
    filterValue !== projectObject.filter
  ) {
    return "accordion-button disabled";
  }
  return "accordion-button";
};

const renderProjects = (projectArray, filterValue) => {
  let accordionItemsHTML = "";

  projectArray.forEach((projectObject) => {
    const formatedCode = projectObject.code.toString().split("").join(".");
    const disableItem =
      filterValue &&
      filterValue !== "all" &&
      filterValue !== projectObject.filter;

    const itemClass = disableItem
      ? "accordion-item disabled"
      : "accordion-item";

    const buttonClass = disableItem
      ? "accordion-button disabled"
      : "accordion-button";

    accordionItemsHTML += `
           <div class="${itemClass}">
             <button class="${buttonClass}">
               <div class="accordion-button-title">${formatedCode} &nbsp; ${projectObject.title}
               </div>
               <div class="accordion-button-type">${projectObject.type}</div>
               <div class="accordion-button-year">${projectObject.year}</div>
             </button>
             <div class="accordion-content">
               <div class="accordion-content-picture-1">
                 <a href="${projectObject.projectUrl}">
                   <img src="${projectObject.picUrl1}" alt="${projectObject.title}" />
                 </a>
               </div>
               <div class="accordion-content-picture-2">
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

  accordionList.innerHTML = accordionItemsHTML;
  hasRendered = true;
};

// Accordion items

// Functions
const filterProjects = (filterValue) => {
  if (hasRendered) {
    accordionList.classList.add("fade-out");
  }

  setTimeout(
    () => {
      let sortedProjects;

      if (filterValue === "all") {
        sortedProjects = [...projects];
      } else {
        sortedProjects = [...projects].sort((a, b) => {
          if (a.filter === filterValue && b.filter !== filterValue) {
            return -1;
          } else if (a.filter !== filterValue && b.filter === filterValue) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      renderProjects(sortedProjects, filterValue);

      if (hasRendered) {
        accordionList.classList.remove("fade-out");
        accordionList.classList.add("fade-in");
      }

      setTimeout(() => {
        accordionList.classList.remove("fade-in");
      }, 500);
    },
    hasRendered ? 500 : 0
  );
};

const openItem = (clickedItem) => {
  document.querySelectorAll(".accordion-item").forEach((otherItem) => {
    if (otherItem !== clickedItem) {
      otherItem.querySelector(".accordion-content").classList.remove("active");
    }
  });
};

// Init
renderProjects(projects);
