const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    if (mainNav.classList.contains("open")) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});