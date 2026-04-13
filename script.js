// Load saved skills
window.onload = function() {
    let skills = JSON.parse(localStorage.getItem("skills")) || [];

    skills.forEach((skill, index) => {
        addSkillToList(skill, index);
    });
};

function addSkill() {
    let input = document.getElementById("skillInput");
    let skill = input.value;

    if (skill === "") return;

    let skills = JSON.parse(localStorage.getItem("skills")) || [];
    skills.push(skill);
    localStorage.setItem("skills", JSON.stringify(skills));

    addSkillToList(skill, skills.length - 1);

    input.value = "";
}

function addSkillToList(skill, index) {
    let li = document.createElement("li");
    li.textContent = skill;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.onclick = function() {
        li.remove();

        let skills = JSON.parse(localStorage.getItem("skills")) || [];
        skills.splice(index, 1); // remove by index
        localStorage.setItem("skills", JSON.stringify(skills));

        location.reload(); // refresh to sync indexes
    };

    li.appendChild(deleteBtn);
    document.getElementById("skillList").appendChild(li);
}