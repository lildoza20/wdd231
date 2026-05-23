const spotlightContainer = document.querySelector("#spotlight-cards");

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json");
        }

        const members = await response.json();

        const qualifiedMembers = members.filter((member) =>
            member.businessMembers === "2" ||
            member.businessMembers === "3" ||
            member.businessMembers === 2 ||
            member.businessMembers === 3
        );

        const randomMembers = qualifiedMembers
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        displaySpotlights(randomMembers);
    } catch (error) {
        console.error(error);
        spotlightContainer.innerHTML = "<p>Member spotlights are unavailable.</p>";
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        const logo = document.createElement("img");
        const name = document.createElement("h3");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const website = document.createElement("a");
        const membership = document.createElement("p");

        card.classList.add("spotlight-card");

        logo.src = `images/${member.businessLogo}`;
        logo.alt = `${member.businessName} logo`;
        logo.loading = "lazy";
        logo.width = 300;
        logo.height = 200;

        name.textContent = member.businessName;
        address.textContent = member.businessAddress;
        phone.textContent = member.businessPhone;

        website.textContent = `Visit ${member.businessName} Website`;
        website.href = member.businessWebsite;
        website.target = "_blank";
        website.rel = "noopener";

        membership.textContent = `Membership Level: ${getMembershipName(member.businessMembers)}`;
        membership.classList.add("membership");

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(website);

        spotlightContainer.appendChild(card);
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

getSpotlights();