import { clients } from "../data/clients.js";

const clientsList = document.querySelector(".clients-list");

const renderClients = (clientsArray) => {
  let clientsItemsHTML = "";

  clientsArray.forEach((clientObject) => {
    clientsItemsHTML += `
        <a  href="${clientObject.url}"
            target="_blank"
            rel="noopener noreferrer">
            ${clientObject.name} ↗</a>
    `;
  });

  clientsList.innerHTML = clientsItemsHTML;
};

// Init
renderClients(clients);
