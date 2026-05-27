const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "Introduces basic programming concepts including variables, input, output, decisions, loops, and problem solving.",
        technology: ["Python"]
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "Introduces web design and development using HTML, CSS, responsive design, and basic web publishing.",
        technology: ["HTML", "CSS"]
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "Builds programming skills with functions, data structures, logic, and problem solving.",
        technology: ["Python"]
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "Introduces object-oriented programming using classes, objects, methods, and encapsulation.",
        technology: ["C#"]
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "Focuses on dynamic web pages using JavaScript, DOM manipulation, events, and responsive design.",
        technology: ["HTML", "CSS", "JavaScript"]
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false,
        certificate: "Web and Computer Programming",
        description: "Develops frontend web skills using JavaScript, APIs, forms, modules, responsive layouts, and project-based development.",
        technology: ["HTML", "CSS", "JavaScript", "APIs"]
    }
];

const courseCards = document.querySelector("#course-cards");
const totalCredits = document.querySelector("#total-credits");
const courseDetails = document.querySelector("#course-details");

const allButton = document.querySelector("#all");
const cseButton = document.querySelector("#cse");
const wddButton = document.querySelector("#wdd");

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal" aria-label="Close course details">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
    `;

    courseDetails.showModal();

    document.querySelector("#closeModal").addEventListener("click", () => {
        courseDetails.close();
    });
}

courseDetails.addEventListener("click", (event) => {const rect = courseDetails.getBoundingClientRect();

    const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

    if (clickedOutside) {
        courseDetails.close();
    }
});

function displayCourses(courseList) {
    courseCards.innerHTML = "";

    courseList.forEach(course => {
        const courseCard = document.createElement("div");

        courseCard.classList.add("course-card");

        if (course.completed) {
        courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
        <h3>${course.subject} ${course.number} ${course.completed ? "✓ " : ""}</h3>`;

        courseCard.addEventListener("click", () => {displayCourseDetails(course);});

        courseCards.appendChild(courseCard);
    });

    const credits = courseList.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = credits;
}

allButton.addEventListener("click", () => {
    displayCourses(courses);
});

cseButton.addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

wddButton.addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

displayCourses(courses);