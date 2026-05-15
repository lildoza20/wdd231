const membersContainer = document.querySelector("#member-cards");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json");
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        membersContainer.innerHTML = "<p>Business directory information could not be loaded.</p>";
        console.error(error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        const logo = document.createElement("img");
        const name = document.createElement("h2");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const membership = document.createElement("p");
        const website = document.createElement("a");

        card.classList.add("member-card");

        logo.src = `images/${member.businessLogo}`;
        logo.alt = `${member.businessName} logo`;
        logo.loading = "lazy";
        logo.width = 300;
        logo.height = 200;

        name.textContent = member.businessName;
        address.textContent = member.businessAddress;
        phone.textContent = member.businessPhone;

        membership.textContent = `Membership Level: ${getMembershipName(member.businessMembers)}`;
        membership.classList.add("membership");

        website.textContent = "Visit Website";
        website.href = member.businessWebsite;
        website.target = "_blank";
        website.rel = "noopener";

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(website);

        membersContainer.appendChild(card);
    });
}

function getMembershipName(level) {
    if (level === "3" || level === 3) {
        return "Gold";
    }

    if (level === "2" || level === 2) {
        return "Silver";
    }

    return "Member";
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");

    gridButton.classList.add("active-button");
    listButton.classList.remove("active-button");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");

    listButton.classList.add("active-button");
    gridButton.classList.remove("active-button");
});

getMembers();