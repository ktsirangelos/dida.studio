// Navigation

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location = link.href;
    }, 500);
  });
});
