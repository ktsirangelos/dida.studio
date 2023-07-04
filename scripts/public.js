import { publications } from "../data/publications.js";

const publicationsList = document.querySelector(".publications");

const renderProjects = (publicationsArray) => {
  let publicationsItemsHTML = "";

  publicationsArray.forEach((publicationsObject) => {
    publicationsItemsHTML += `
    <div class="publication">
        <p>${publicationsObject.title}</p>
        <p>${publicationsObject.type}</p>
        <p>${publicationsObject.year}</p>
    </div>
    `;
  });

  publicationsList.innerHTML = publicationsItemsHTML;
};

// Init
renderProjects(publications);
