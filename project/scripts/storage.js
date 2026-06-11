const searchKey = "last3dPrintSearch";

export function saveLastSearch(searchTerm) {
    localStorage.setItem(searchKey, searchTerm);
}

export function getLastSearch() {
    return localStorage.getItem(searchKey) || "";
}
