const timestamp = document.querySelector("#timestamp");
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        const rect = dialog.getBoundingClientRect();

        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) {
            dialog.close();
        }
    });
});

const thankyouCard = document.querySelector(".thankyou-card");

if (thankyouCard) {
    const params = new URLSearchParams(window.location.search);

    document.querySelector("#first-name").textContent = params.get("first-name") || "Not provided";
    document.querySelector("#last-name").textContent = params.get("last-name") || "Not provided";
    document.querySelector("#email").textContent = params.get("email") || "Not provided";
    document.querySelector("#mobile-phone").textContent = params.get("mobile-phone") || "Not provided";
    document.querySelector("#business-name").textContent = params.get("business-name") || "Not provided";

    const submittedTimestamp = params.get("timestamp");

    if (submittedTimestamp) {
        const date = new Date(submittedTimestamp);
        document.querySelector("#timestamp-display").textContent = date.toLocaleString();
    } else {
        document.querySelector("#timestamp-display").textContent = "Not provided";
    }
}