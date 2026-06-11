const dialog = document.querySelector("#idea-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeButton = document.querySelector("#close-dialog");

export function openIdeaDialog(idea) {
    if (!dialog || !dialogContent) {
        return;
    }

    dialogContent.innerHTML = `
        <h2>${idea.name}</h2>
        <p>${idea.description}</p>
        <p><strong>Category:</strong> ${idea.category}</p>
        <p><strong>Difficulty:</strong> ${idea.difficulty}</p>
        <p><strong>Material:</strong> ${idea.material}</p>
        <p><strong>Estimated Print Time:</strong> ${idea.printTime}</p>
        <p><strong>Best For:</strong> ${idea.bestFor}</p>
        <div class="tag-row">${idea.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <div class="modal-actions">
            <a class="print-link" href="${idea.url}" target="_blank" rel="noopener">Open Print Link</a>
        </div>
    `;

    dialog.showModal();
}

if (closeButton && dialog) {
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
}
