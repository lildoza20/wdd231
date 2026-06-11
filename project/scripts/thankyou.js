import "./navigation.js";
import "./dates.js";

const output = document.querySelector("#form-output");
const params = new URLSearchParams(window.location.search);

if (output) {
    if ([...params].length === 0) {
        output.innerHTML = "<p>No form information was submitted.</p>";
    } else {
        output.innerHTML = `
            <ul class="thankyou-list">
                <li><strong>Name:</strong> ${params.get("fullname") || "Not provided"}</li>
                <li><strong>Email:</strong> ${params.get("email") || "Not provided"}</li>
                <li><strong>Print Type:</strong> ${params.get("print-type") || "Not provided"}</li>
                <li><strong>Difficulty:</strong> ${params.get("difficulty") || "Not provided"}</li>
                <li><strong>Idea:</strong> ${params.get("details") || "Not provided"}</li>
            </ul>
        `;
    }
}
