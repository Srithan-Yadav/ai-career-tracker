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
        span.textContent = skill;

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.onclick = function() {
            let newSkill = prompt("Edit your skill:", skill);
            if (newSkill && newSkill !== "") {
                skills[index] = newSkill;
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
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        skillList.appendChild(li);
    });
}

function addSkill() {
    let input = document.getElementById("skillInput");
    let skill = input.value;

    if (skill === "") return;

    let skills = getSkills();
    skills.push(skill);
    saveSkills(skills);

    input.value = "";
    renderSkills();
}

// Load on start
window.onload = renderSkills;