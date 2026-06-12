import "./navigation.js";
import "./dates.js";
import { openIdeaDialog } from "./modal.js";
import {
    saveLastSearch,
    getLastSearch,
    saveLastCategory,
    getLastCategory,
    saveLastDifficulty,
    getLastDifficulty
} from "./storage.js";

const cardsContainer = document.querySelector("#ideas-container");
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const difficultySelect = document.querySelector("#difficulty-select");
const resultMessage = document.querySelector("#result-message");

let allIdeas = [];

async function getIdeas() {
    try {
        const response = await fetch("data/prints.json");

        if (!response.ok) {
            throw new Error("Print ideas could not be loaded.");
        }

        allIdeas = await response.json();
        setupControls();
        filterIdeas();
    } catch (error) {
        cardsContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function setupControls() {
    const savedSearch = getLastSearch();
    const savedCategory = getLastCategory();
    const savedDifficulty = getLastDifficulty();

    if (savedSearch) {
        searchInput.value = savedSearch;
    }

    categorySelect.value = savedCategory;
    difficultySelect.value = savedDifficulty;

    searchInput.addEventListener("input", filterIdeas);
    categorySelect.addEventListener("change", filterIdeas);
    difficultySelect.addEventListener("change", filterIdeas);
}

function filterIdeas() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    const selectedDifficulty = difficultySelect.value;

    saveLastSearch(searchTerm);
    saveLastCategory(selectedCategory);
    saveLastDifficulty(selectedDifficulty);

    const filteredIdeas = allIdeas.filter((idea) => {
        const searchableText = `${idea.name} ${idea.category} ${idea.description} ${idea.tags.join(" ")} ${idea.bestFor}`.toLowerCase();
        const searchMatch = searchTerm === "" || searchableText.includes(searchTerm);
        const categoryMatch = selectedCategory === "all" || idea.category === selectedCategory;
        const difficultyMatch = selectedDifficulty === "all" || idea.difficulty === selectedDifficulty;

        return searchMatch && categoryMatch && difficultyMatch;
    });

    displayIdeas(filteredIdeas);
}

function displayIdeas(ideas) {
    cardsContainer.innerHTML = "";

    if (ideas.length === 0) {
        resultMessage.textContent = "No print ideas matched your search.";
        cardsContainer.innerHTML = `<p class="empty-message">Try a different keyword like toy, gift, desk, tool, or home.</p>`;
        return;
    }

    resultMessage.textContent = `Showing ${ideas.length} print idea${ideas.length === 1 ? "" : "s"}.`;

    ideas.forEach((idea) => {
        const card = document.createElement("article");
        card.classList.add("idea-card");

        card.innerHTML = `
            <div>
                <h2>${idea.name}</h2>
                <p>${idea.description}</p>
                <p><strong>Category:</strong> ${idea.category}</p>
                <p><strong>Difficulty:</strong> ${idea.difficulty}</p>
                <p><strong>Material:</strong> ${idea.material}</p>
                <p><strong>Print Time:</strong> ${idea.printTime}</p>
                <div class="tag-row">${idea.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
            </div>
            <button type="button">View Details</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            openIdeaDialog(idea);
        });

        cardsContainer.appendChild(card);
    });
}

getIdeas();