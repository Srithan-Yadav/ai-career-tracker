function getSkills() {
    return JSON.parse(localStorage.getItem("skills")) || [];
}

function saveSkills(skills) {
    localStorage.setItem("skills", JSON.stringify(skills));
}

function renderSkills() {
    let skillList = document.getElementById("skillList");
    skillList.innerHTML = "";

    let skills = getSkills();

    skills.forEach((skill, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = skill.name + " (" + skill.category + " - " + skill.level + ")";

        // Progress bar
        let progress = document.createElement("div");

        let width = "30%";
        if (skill.level === "Intermediate") width = "60%";
        if (skill.level === "Advanced") width = "100%";

        progress.style.width = width;
        progress.style.height = "5px";
        progress.style.background = "green";
        progress.style.marginTop = "5px";

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.onclick = function() {
            let newSkill = prompt("Edit your skill:", skill.name);
            if (newSkill) {
                skills[index].name = newSkill;
                saveSkills(skills);
                renderSkills();
            }
        };

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";

        deleteBtn.onclick = function() {
            skills.splice(index, 1);
            saveSkills(skills);
            renderSkills();
        };

        li.appendChild(span);
        li.appendChild(progress);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        skillList.appendChild(li);
    });

    updateStats(skills);
}

function addSkill() {
    let input = document.getElementById("skillInput");
    let category = document.getElementById("category").value;
    let level = document.getElementById("level").value;

    let skill = input.value.trim();
    if (skill === "") return;

    let skills = getSkills();

    // Add to top
    skills.unshift({
        name: skill,
        category: category,
        level: level
    });

    saveSkills(skills);

    input.value = "";
    renderSkills();
}

function updateStats(skills) {
    document.getElementById("totalCount").textContent = skills.length;

    let frontend = skills.filter(s => s.category === "Frontend").length;
    let backend = skills.filter(s => s.category === "Backend").length;
    let ai = skills.filter(s => s.category === "AI").length;

    document.getElementById("frontendCount").textContent = frontend;
    document.getElementById("backendCount").textContent = backend;
    document.getElementById("aiCount").textContent = ai;
}

window.onload = renderSkills;