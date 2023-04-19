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
