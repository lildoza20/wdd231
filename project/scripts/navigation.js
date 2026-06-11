const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
        primaryNav.classList.toggle("open");
        const isOpen = primaryNav.classList.contains("open");
        menuButton.textContent = isOpen ? "Close" : "Menu";
    });
}
