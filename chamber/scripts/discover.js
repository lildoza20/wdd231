import { places } from "../data/places.mjs";

const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

function displayPlaces() {
    places.forEach((place, index) => {
        const card = document.createElement("article");
        const title = document.createElement("h2");
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const address = document.createElement("address");
        const description = document.createElement("p");
        const button = document.createElement("button");

        card.classList.add("discover-card");
        card.classList.add(`place-${index + 1}`);

        title.textContent = place.name;

        image.src = `images/${place.image}`;
        image.alt = place.name;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        figure.appendChild(image);

        address.textContent = place.address;
        description.textContent = place.description;

        button.textContent = "Learn More";
        button.type = "button";
        button.setAttribute("aria-label", `Learn more about ${place.name}`);

        button.addEventListener("click", () => {
            window.open(place.url, "_blank", "noopener");
        });

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        cardsContainer.appendChild(card);
    });
}

function displayVisitMessage() {
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const millisecondsBetweenVisits = currentVisit - Number(lastVisit);
        const daysBetweenVisits = Math.floor(millisecondsBetweenVisits / 86400000);

        if (daysBetweenVisits < 1) {
            visitMessage.textContent = "Back so soon! Good to see you again!!";
        } else if (daysBetweenVisits === 1) {
            visitMessage.textContent = "You last visited 1 day ago. Welcome back!";
        } else {
            visitMessage.textContent = `You last visited ${daysBetweenVisits} days ago. Welcome back!`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

displayPlaces();
displayVisitMessage();