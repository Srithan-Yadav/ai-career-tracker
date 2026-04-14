function getSkills() {
    return JSON.parse(localStorage.getItem("skills")) || [];
}

function saveSkills(skills) {
    localStorage.setItem("skills", JSON.stringify(skills));
}

function renderSkills() {
    let skillList = document.getElementById("skillList");
    if (!skillList) return; // safety check

    skillList.innerHTML = "";

    let skills = getSkills();

    skills.forEach((skill, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = (skill.name || skill) + " (" + (skill.category || "General") + " - " + (skill.level || "Beginner") + ")";

        let progress = document.createElement("div");

        let width = "30%";
        if (skill.level === "Intermediate") width = "60%";
        if (skill.level === "Advanced") width = "100%";

        progress.style.width = width;
        progress.style.height = "5px";
        progress.style.background = "green";
        progress.style.marginTop = "5px";

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
    let category = document.getElementById("category");
    let level = document.getElementById("level");

    if (!input || !category || !level) {
        alert("Check HTML IDs (skillInput / category / level)");
        return;
    }

    let skill = input.value.trim();
    if (skill === "") return;

    let skills = getSkills();
    console.log("Adding:", skill, category.value, level.value);
    
    skills.push({
        name: skill,
        category: category.value,
        level: level.value
    });

    saveSkills(skills);

    input.value = "";
    renderSkills();
}

function updateStats(skills) {
    let total = document.getElementById("totalCount");
    let frontend = document.getElementById("frontendCount");
    let backend = document.getElementById("backendCount");
    let ai = document.getElementById("aiCount");

    if (!total || !frontend || !backend || !ai) return;

    total.textContent = skills.length;
    frontend.textContent = skills.filter(s => s.category === "Frontend").length;
    backend.textContent = skills.filter(s => s.category === "Backend").length;
    ai.textContent = skills.filter(s => s.category === "AI").length;
}

window.onload = renderSkills;