// Load saved skills
window.onload = function() {
    let skills = JSON.parse(localStorage.getItem("skills")) || [];

    skills.forEach((skill, index) => {
        addSkillToList(skill, index);
    });
};

function addSkillToList(skill, index) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = skill;

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function() {
        let newSkill = prompt("Edit your skill:", skill);

        if (newSkill && newSkill !== "") {
            span.textContent = newSkill;

            let skills = JSON.parse(localStorage.getItem("skills")) || [];
            skills[index] = newSkill;
            localStorage.setItem("skills", JSON.stringify(skills));
        }
    };

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.onclick = function() {
        let skills = JSON.parse(localStorage.getItem("skills")) || [];
        skills.splice(index, 1);
        localStorage.setItem("skills", JSON.stringify(skills));

        location.reload();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("skillList").appendChild(li);
}