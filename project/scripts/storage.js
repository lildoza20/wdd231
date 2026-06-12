const searchKey = "last3dPrintSearch";
const categoryKey = "last3dPrintCategory";
const difficultyKey = "last3dPrintDifficulty";

export function saveLastSearch(searchTerm) {
    localStorage.setItem(searchKey, searchTerm);
}

export function getLastSearch() {
    return localStorage.getItem(searchKey) || "";
}

export function saveLastCategory(category) {
    localStorage.setItem(categoryKey, category);
}

export function getLastCategory() {
    return localStorage.getItem(categoryKey) || "all";
}

export function saveLastDifficulty(difficulty) {
    localStorage.setItem(difficultyKey, difficulty);
}

export function getLastDifficulty() {
    return localStorage.getItem(difficultyKey) || "all";
}